import React from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import PageLoading from "../../../../components/webapp/PageLoading";

export default function Page() {
  return (
    <section className="bg-primay  p-5 bg-primar ">
      <div className="bgsecondary">dddd</div>
      <AppButton disabled={true} theme="primary">
        Clllllllllllllllllllick me
      </AppButton>
      <div className="h-[500px] relative">
        <PageLoading showLogo={false} />
      </div>
    </section>
  );
}
