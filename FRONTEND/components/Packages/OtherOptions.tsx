import api from "@/lib/axios";
import { IResponse } from "@/types";
import React from "react";

interface IProps {
  package_id: number;
}

interface IOtherOptions {
  id: number;
  package_id: number;
  option_name: string;
  option_content: string;
}

export default async function OtherOptions({ package_id }: IProps) {
  const others = (
    await api.get<IResponse<IOtherOptions[]>>(
      `/api/v1/package/other/${package_id}?withContent=true`
    )
  ).data;

  return (
    <section>
      {others.data.map((other) => (
        <React.Fragment key={other.id}>
          <h3
            id={other.option_name}
            className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg my-5"
          >
            {other.option_name}
          </h3>

          <p
            dangerouslySetInnerHTML={{ __html: other.option_content }}
            className="text-sm leading-7 mt-4"
          ></p>
        </React.Fragment>
      ))}
    </section>
  );
}
