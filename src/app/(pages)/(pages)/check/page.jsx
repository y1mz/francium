import AboutHeader from "@/components/about/header";
import LinkCheckerBox from "@/components/shorter/checker/link-checker";

export const metadata = {
  title: `Link Checkcer`,
  description: `Check and verify short your short urls.`,
};

function CheckUrlPage() {
  return (
    <div>
      <AboutHeader title="Check short-urls" />
      <div className="flex flex-col mx-auto max-w-[768px] px-5 py-10">
        <LinkCheckerBox />
      </div>
    </div>
  );
}

export default CheckUrlPage;
