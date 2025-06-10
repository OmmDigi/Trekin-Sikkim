-- CREATE DATABASE trek_sikkim;

-- USER TABLE
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password TEXT NOT NULL,
    user_role VARCHAR(50) DEFAULT 'User',
    user_contact_number VARCHAR(20),
    profile_image TEXT,
    address TEXT,
    is_verified INTEGER DEFAULT 0,
    account_type VARCHAR(100) DEFAULT 'Normal',
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_email, account_type)
);

CREATE TABLE types (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);

INSERT INTO types (type_name) VALUES ('Trek'), ('Tour'), ('Expedition');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    type_id BIGINT,
    FOREIGN KEY (type_id) REFERENCES types(type_id) ON DELETE SET NULL,
    slug TEXT
);

CREATE INDEX idx_category_slug ON category (slug);

-- CREATE TABLE price_type (
--     price_type_id SERIAL PRIMARY KEY,
--     price_type_text VARCHAR(100)
-- );

-- INSERT INTO price_type (price_type_text) VALUES ('INR'), ('USD');

-- CREATE TABLE additional (
--     additional_id SERIAL PRIMARY KEY,
--     additional_name VARCHAR(255) NOT NULL,
--     additional_price DECIMAL(10, 2) DEFAULT 0.00,
--     price_type_id INTEGER,
--     FOREIGN KEY (price_type_id) REFERENCES price_type(price_type_id) ON DELETE SET NULL
-- );

-- DROP TABLE additional;

CREATE TABLE additional (
    additional_id SERIAL PRIMARY KEY,
    additional_name VARCHAR(255) NOT NULL,
    price_inr DECIMAL(10, 2) DEFAULT 0.00,
    price_usd DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE media_item (
    media_item_id SERIAL PRIMARY KEY,
    media_type VARCHAR(255) NOT NULL,
    item_link TEXT,
    alt_tag VARCHAR(255)
);

CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    package_name VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    best_time VARCHAR(255) NOT NULL,
    highest_altitude VARCHAR(255) NOT NULL,
    suitable_for VARCHAR(255) NOT NULL,
    trek_distance VARCHAR(255) NOT NULL,
    original_price_inr NUMERIC NOT NULL,
    offer_price_inr NUMERIC NOT NULL,
    original_price_usd NUMERIC NOT NULL,
    offer_price_usd NUMERIC NOT NULL,
    is_active INT DEFAULT 1,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL
);

CREATE TABLE packages_departure_date (
    id SERIAL PRIMARY KEY,
    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    for_month VARCHAR(20) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    max_seats INTEGER NOT NULL,

    avilibility_text VARCHAR(255)
);

CREATE TABLE package_and_media (
    id SERIAL PRIMARY KEY,

    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    media_item_id INTEGER NOT NULL,
    FOREIGN KEY (media_item_id) REFERENCES media_item(media_item_id) ON DELETE CASCADE,

    where_to_use VARCHAR(255), -- gallery,

    UNIQUE (media_item_id, package_id)
);

CREATE INDEX idx_pam_package_where ON package_and_media(package_id, where_to_use);

CREATE TABLE package_faq (
    id SERIAL PRIMARY KEY,

    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    faq_heading TEXT NOT NULL,
    faq_detail TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE package_itinerary (
    id SERIAL PRIMARY KEY,

    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    itinerary_heading VARCHAR(255) NOT NULL,
    itinerary_subheading VARCHAR(255) NOT NULL,
    itinerary_details TEXT  NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE package_overview (
    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    overview TEXT NOT NULL,

    UNIQUE(package_id)
);

CREATE TABLE package_and_other (
    id SERIAL PRIMARY KEY,

    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    option_name VARCHAR(255),
    option_content TEXT
);

CREATE TABLE package_and_additional (
    id SERIAL PRIMARY KEY,

    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    additional_id INTEGER NOT NULL,
    FOREIGN KEY (additional_id) REFERENCES additional(additional_id) ON DELETE CASCADE,

    UNIQUE (package_id, additional_id)
);

CREATE TABLE categorypage_faq (
    id SERIAL PRIMARY KEY,

    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,

    faq_heading TEXT NOT NULL,
    faq_detail TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorypage_media (
    id SERIAL PRIMARY KEY,

    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,

    media_item_id INTEGER NOT NULL,
    FOREIGN KEY (media_item_id) REFERENCES media_item(media_item_id) ON DELETE CASCADE,

    where_to_use VARCHAR(255), -- ex gallery,

    UNIQUE (media_item_id, category_id)
);

CREATE TABLE categorypage_page_content (
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,

    page_content TEXT,

    UNIQUE(category_id)
);

/* START HERE */
CREATE TABLE enrolled_package (
    id SERIAL PRIMARY KEY,

    order_id VARCHAR(255),

    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,

    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    as_type INTEGER, -- ex, as-participants === 1, as-owner === 2

    trip_type VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX enrolled_package_order_id_index ON enrolled_package (order_id);

CREATE TABLE order_id_and_additional (
    id SERIAL PRIMARY KEY,

    order_id VARCHAR(255),

    additional_id INTEGER NOT NULL,
    FOREIGN KEY (additional_id) REFERENCES additional(additional_id) ON DELETE CASCADE
);

CREATE TABLE order_id_and_date (
    id SERIAL PRIMARY KEY,

    order_id VARCHAR(255),

    departure_date_id INTEGER NOT NULL,
    FOREIGN KEY (departure_date_id) REFERENCES packages_departure_date(id) ON DELETE CASCADE
);

CREATE TABLE temp_create_order_info (
    order_id VARCHAR(255),
    info TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX create_order_info_order_id_index ON temp_create_order_info (order_id);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(255),
    transactionId VARCHAR(255),
    amount DECIMAL(10, 2),
    state VARCHAR(255),
    paymentInstrument TEXT
);

/* END HERE */

ALTER TABLE packages ADD COLUMN slug TEXT;
CREATE INDEX packages_slug_index ON packages (slug);

ALTER TABLE packages_departure_date ADD COLUMN avilibility_color VARCHAR(100) DEFAULT 'Green';

ALTER TABLE users ADD COLUMN dial_code VARCHAR(12);

CREATE TABLE blogs (
    blog_id SERIAL PRIMARY KEY,
    heading VARCHAR(255) NOT NULL,
    blog_content TEXT NOT NULL,
    thumbnail TEXT NOT NULL,

    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT NOT NULL,
    meta_canonical_url VARCHAR(255) NOT NULL,

    created_at DATE DEFAULT CURRENT_DATE,

    visible BOOLEAN NOT NULL DEFAULT TRUE,

    thumbnail_alt_tag VARCHAR(255) DEFAULT '',

    slug TEXT NOT NULL,

    UNIQUE(slug)
);

CREATE INDEX blog_slug_index ON blogs (slug);

ALTER TABLE category ADD COLUMN meta_title VARCHAR(255) DEFAULT '',
ADD COLUMN meta_description VARCHAR(255) DEFAULT '',
ADD COLUMN meta_keywords VARCHAR(255) DEFAULT '',
ADD COLUMN canonical VARCHAR(255);

CREATE TABLE package_and_seo (
    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    meta_title VARCHAR(255) DEFAULT '',
    meta_description TEXT DEFAULT '',
    meta_keywords TEXT,
    canonical TEXT,

    UNIQUE(package_id)
);

ALTER TABLE blogs DROP COLUMN meta_canonical_url;
ALTER TABLE blogs ADD COLUMN meta_canonical_url TEXT;

ALTER TABLE blogs ADD COLUMN media_id INTEGER;

-- new today 27-05-2025
ALTER TABLE packages ADD CONSTRAINT unique_package_slug UNIQUE (slug);
ALTER TABLE category ADD CONSTRAINT unique_category_slug UNIQUE (slug);
ALTER TABLE blogs ADD CONSTRAINT unique_blogs_slug UNIQUE (slug);

ALTER TABLE packages_departure_date ADD COLUMN is_active INTEGER DEFAULT 1;

-- new today 30-05-2025
CREATE TABLE upcoming_treks (
    id SERIAL PRIMARY KEY,

    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    UNIQUE(package_id)
);

ALTER TABLE category ADD COLUMN showinhomepage BOOLEAN DEFAULT true;

CREATE TABLE package_itinerary_pdf (
    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    file_link TEXT,

    UNIQUE(package_id)
);

ALTER TABLE order_id_and_date
ALTER COLUMN departure_date_id DROP NOT NULL;

ALTER TABLE order_id_and_date
ADD COLUMN from_date DATE,
ADD COLUMN to_date DATE;

CREATE TABLE enquiry_form (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    contact_number VARCHAR(30),
    number_of_person INT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO types (type_name) VALUES ('Other');

ALTER TABLE packages DROP COLUMN category_id;
ALTER TABLE category ADD COLUMN add_to_footer BOOLEAN DEFAULT false;

CREATE TABLE category_and_packages (
    package_id INTEGER NOT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,

    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,

    UNIQUE (package_id, category_id)
);