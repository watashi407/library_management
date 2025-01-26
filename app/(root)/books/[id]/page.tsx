import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <div>{id} Its temporary</div>;
};

export default page;
