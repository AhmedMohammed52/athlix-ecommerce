import MainArticle from "./MainArticle";
import JournalData from "../../data/JournalData";
import JournalCard from "./JournalCard";

export default function JournalContent() {
  return (
    <div className=" py-10 md:py-14">
      <div className="pb-16">
        <MainArticle />
      </div>

      <div className="pb-16">
        <h2 className=" font-display font-bold text-2xl mb-6">Latest</h2>

        <div className=" grid gap-8 md:grid-cols-3">
          {JournalData.map((item) => (
            <JournalCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
