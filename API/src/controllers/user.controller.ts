import { pool } from "../config/db";
import asyncErrorHandler from "../middlewares/asyncErrorHandler";
import { CustomRequest, IGAuth, IGAuthProfile, PgError } from "../types";
import { ApiResponse } from "../utils/ApiResponse";
import { decrypt, encrypt } from "../utils/crypto";
import { ErrorHandler } from "../utils/ErrorHandler";
import { createToken, verifyToken } from "../utils/jwt";
import { objectToSqlConverterUpdate } from "../utils/objectToSql";
import { sendEmail } from "../utils/sendEmail";
import {
  VChangePassword,
  VGetResetPassPage,
  VLoginUser,
  VResetPassword,
  VSignupUser,
  VUpdateAccountInfo,
  VVerifyOtp,
} from "../validator/user.validator";

export const loginUser = asyncErrorHandler(async (req, res) => {
  const { error, value } = VLoginUser.validate(req.body || {});
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const origin = req.get("Origin") || req.get("Referer");

  const accountRole = origin === process.env.CRM_HOST_URL ? "Admin" : "User";

  const { rowCount, rows } = await pool.query(
    "SELECT user_id, user_name, user_role, user_password, is_verified FROM users WHERE user_email = $1 AND account_type = 'Normal' AND user_role = $2",
    [value.user_email, accountRole]
  );

  if (rowCount === 0)
    throw new ErrorHandler(404, "Account does not exist", "user_email");

  if (rows[0].is_verified === 0) {
    const token = createToken(
      {
        user_id: rows[0].user_id,
      },
      {
        expiresIn: "5m",
      }
    );

    await sendEmail(value.user_email, "verify-email", {
      verifyEmailLink: `${process.env.API_HOST_URL}/api/v1/users/verify-email/${token}`,
    });
    // throw new ErrorHandler(401, "Please verify your account first");
    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          "Verification link has been sent to your email. verify it first"
        )
      );
  }

  // now check the user password
  const { isError, decrypted } = decrypt(rows[0].user_password);
  if (isError) throw new ErrorHandler(400, "Wrong user credential");
  if (decrypted !== value.user_password)
    throw new ErrorHandler(400, "Wrong user credential");

  //create jwt token
  const token = createToken({
    role: rows[0].user_role,
    name: rows[0].user_name,
    id: rows[0].user_id,
  });

  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: process.env.DOMAIN,
  });

  //update last login
  pool.query("UPDATE users SET last_login = NOW() WHERE user_id = $1", [
    rows[0].user_id,
  ]);

  res.status(200).json(new ApiResponse(200, "Login completed", token));
});

export const createAdmin = asyncErrorHandler(async (req, res) => {
  if (req.body?.admin_creator_key !== process.env.ADMIN_CREATOR_KEY)
    throw new ErrorHandler(400, "Your are not able to access this route");

  const envPassword = process.env.ADMIN_PASSWORD || "";

  const new_password = encrypt(envPassword);

  await pool.query(
    "INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, $4)",
    [
      "Trek In Sikkim",
      "treksikkim.ommdigitalsoluction@gmail.com",
      new_password,
      "Admin",
    ]
  );

  res.status(200).json(new ApiResponse(200, "Admin account has created"));
});

export const signupUser = asyncErrorHandler(async (req, res) => {
  const { error, value } = VSignupUser.validate(req.body || {});
  if (error)
    throw new ErrorHandler(400, error.message, error.details[0].context?.key);

  const encryptPassword = encrypt(value.user_password);

  let token = "";

  try {
    const { rows } = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, $4) RETURNING user_id",
      [value.user_name, value.user_email, encryptPassword, "User"]
    );
    token = createToken(
      {
        user_id: rows[0].user_id,
      },
      {
        expiresIn: "5m",
      }
    );
  } catch (error) {
    const err = error as PgError;
    if (err.code === "23505") {
      throw new ErrorHandler(
        400,
        "You have already registered. Please log in.",
        "root"
      );
    }

    throw new ErrorHandler(
      500,
      "Something went wrong. Please try again later.",
      "root"
    );
  }

  await sendEmail(value.user_email, "verify-email", {
    verifyEmailLink: `${process.env.API_HOST_URL}/api/v1/users/verify-email/${token}`,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Verification link has been sent to your email. verify it first"
      )
    );
});

export const verifyEmail = asyncErrorHandler(async (req, res) => {
  const { error, value } = VVerifyOtp.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { data, error: jwtError } = await verifyToken<{ user_id: number }>(
    value.token
  );
  if (jwtError)
    throw new ErrorHandler(400, "Invalid token or token has expired");

  const { rows } = await pool.query(
    "UPDATE users SET is_verified = 1 WHERE user_id = $1 RETURNING user_email",
    [data?.user_id]
  );

  res.render("email-verified-page", {
    userEmail: rows[0].user_email,
    loginPageUrl: `${process.env.FRONTEND_HOST_URL}/auth/login`,
  });
});

export const logout = asyncErrorHandler(async (req: CustomRequest, res) => {
  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain: process.env.DOMAIN,
    })
    .status(200)
    .json(new ApiResponse(200, "Successfully logout"));
});

//password change controllers
export const sendResetPasswordLink = asyncErrorHandler(async (req, res) => {
  const { error, value } = VResetPassword.validate(req.body || {});
  if (error) throw new ErrorHandler(400, error.message);

  const { rows, rowCount } = await pool.query(
    "SELECT user_id, user_name, user_role FROM users WHERE user_email = $1 AND account_type = 'Normal'",
    [value.user_email]
  );
  if (rowCount === 0)
    throw new ErrorHandler(
      404,
      "No user has found with this email",
      "user_email"
    );

  const token = createToken(
    { user_id: rows[0].user_id, user_role: rows[0].user_role },
    { expiresIn: "1h" }
  );

  sendEmail(value.user_email, "reset-password-email", {
    userName: rows[0].user_name,
    setNewPasswordPageLink: `${process.env.API_HOST_URL}/api/v1/users/reset-password/page/${token}`,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `Reset password link has been sent to this email (${value.user_email})`
      )
    );
});

export const getResetPasswordPage = asyncErrorHandler(async (req, res) => {
  const { error, value } = VGetResetPassPage.validate(req.params);
  if (error) throw new ErrorHandler(400, error.message);

  const { error: jwtError, data: jwtData } = await verifyToken<{
    user_id: number;
    user_role: string;
  }>(value.token);
  if (jwtError) throw new ErrorHandler(400, "Invalid or expired token");

  let loginPageLink = `${process.env.FRONTEND_HOST_URL}/auth/login`;
  if (jwtData?.user_role !== "User") {
    loginPageLink = `${process.env.CRM_HOST_URL}/auth/login`;
  }

  res.render("reset-password-page", {
    token: value.token,
    loginPageLink,
  });
});

export const changePassword = asyncErrorHandler(async (req, res) => {
  const { error, value } = VChangePassword.validate(req.body);
  if (error) throw new ErrorHandler(400, error.message);

  const { error: jwtError, data: jwtData } = await verifyToken<{
    user_id: number;
    user_role: string;
  }>(value.token);
  if (jwtError) throw new ErrorHandler(400, "Invalid or expired token");

  const encryptPassword = encrypt(value.new_password);

  await pool.query("UPDATE users SET user_password = $1 WHERE user_id = $2", [
    encryptPassword,
    jwtData?.user_id,
  ]);

  let loginPageLink = `${process.env.FRONTEND_HOST_URL}/auth/login`;
  if (jwtData?.user_role !== "User") {
    loginPageLink = `${process.env.CRM_HOST_URL}/auth/login`;
  }

  res.render("password-changed-success", {
    loginPageLink,
  });
});

//login with google
export const loginWithGoogle = asyncErrorHandler(async (req, res) => {
  const redirectAfterLogin = req.query.redirect || process.env.REDIRECT_URL;
  const state = Buffer.from(JSON.stringify({ redirectAfterLogin })).toString(
    "base64"
  );
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    process.env.CLIENT_ID
  }&redirect_uri=${
    process.env.REDIRECT_URL
  }&response_type=code&scope=profile email&state=${encodeURIComponent(state)}`;

  res.status(307).redirect(url);
});

export const verifyGoogleLogin = asyncErrorHandler(async (req, res) => {
  const { code, state } = req.query;

  let redirectAfterLogin = process.env.FRONTEND_HOST_URL;
  if (state) {
    try {
      const decoded = JSON.parse(
        Buffer.from(state.toString(), "base64").toString("utf-8")
      );
      if (decoded.redirectAfterLogin)
        redirectAfterLogin = decoded.redirectAfterLogin;
    } catch (err) {
      console.error("Invalid state param:", err);
    }
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
      redirect_uri: process.env.REDIRECT_URL,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok)
    throw new ErrorHandler(
      400,
      "Some error happened while verifying google login"
    );

  const result = await response.json();
  const { access_token } = result as IGAuth;

  const profileResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  if (!profileResponse.ok)
    throw new ErrorHandler(
      400,
      "Some error happened while fetching user profile info"
    );

  const googleProfile = (await profileResponse.json()) as IGAuthProfile;

  const encryptPassword = encrypt(googleProfile.id);

  const { rows } = await pool.query(
    `
    INSERT INTO users 
      (user_name, user_email, user_password, profile_image, is_verified, account_type)
    VALUES 
      ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_email, account_type)
    DO UPDATE SET
      profile_image = EXCLUDED.profile_image,
      last_login = NOW()
    RETURNING user_id, user_role
  `,
    [
      googleProfile.name,
      googleProfile.email,
      encryptPassword,
      googleProfile.picture,
      1,
      "Google",
    ]
  );

  // res.redirect(`${process.env.FRONTEND_HOST_URL}/account`)
  const token = createToken(
    {
      role: rows[0].user_role,
      name: googleProfile.name,
      id: rows[0].user_id,
      google_oauth_access_token: access_token,
    },
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: process.env.DOMAIN,
  });

  // res.status(200).json(new ApiResponse(200, "Login completed", token));
  res.redirect(redirectAfterLogin || "");
});

// account
export const getAccountInfo = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { rows, rowCount } = await pool.query(
      `
      WITH user_enrolled_packages AS (

        SELECT
          p.id,
          p.package_name,
          p.duration,
          p.short_description,
          p.highest_altitude,
          mi.item_link as thumbnail,
          mi.alt_tag as alt_tag,
          p.slug
        FROM enrolled_package ep

        LEFT JOIN packages p
        ON p.id = ep.package_id

        LEFT JOIN LATERAL (
          SELECT pm.package_id, pm.media_item_id
          FROM package_and_media pm
          WHERE pm.where_to_use = 'thumbnail' AND pm.package_id = p.id
          LIMIT 1
        ) pm ON pm.package_id = p.id

        LEFT JOIN media_item mi
        ON mi.media_item_id = pm.media_item_id
      
        WHERE ep.user_id = $1

        GROUP BY p.id, mi.item_link, mi.alt_tag
      )
      SELECT 
        u.user_id, 
        u.user_name, 
        u.user_email, 
        u.profile_image, 
        u.user_contact_number, 
        u.address,
        COALESCE(JSON_AGG(up) FILTER (WHERE up.id IS NOT NULL), '[]') AS enrolled_packages
      FROM users u

      LEFT JOIN user_enrolled_packages up ON TRUE

      WHERE u.user_id = $1

      GROUP BY u.user_id
      `,
      [req.user_info?.id]
    );

    if (rowCount === 0) throw new ErrorHandler(404, "No account found");

    res.status(200).json(new ApiResponse(200, "User account info", rows[0]));
  }
);

export const checkIsLogin = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    res.status(200).json(new ApiResponse(200, "User is logged in"));
  }
);

export const updateAccountInfo = asyncErrorHandler(
  async (req: CustomRequest, res) => {
    const { error } = VUpdateAccountInfo.validate({
      ...req.body,
      user_id: req.user_info?.id,
    });
    if (error) throw new ErrorHandler(400, error.message);

    const { keys, paramsNum, values } = objectToSqlConverterUpdate(req.body);
    values.push(`${req.user_info?.id}`);

    await pool.query(
      `UPDATE users SET ${keys} WHERE user_id = $${paramsNum}`,
      values
    );

    res.status(200).json(new ApiResponse(200, "Update successfull"));
  }
);
