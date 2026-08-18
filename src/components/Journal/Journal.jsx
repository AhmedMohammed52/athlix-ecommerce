import JournalHeader from "./JournalHeader";
import JournalContent from "./JournalContent";

export default function Journal() {
  return (
    <div className=" container-athlix pt-10 md:pt-14">
      <JournalHeader />

      <JournalContent />
    </div>
  );
}
