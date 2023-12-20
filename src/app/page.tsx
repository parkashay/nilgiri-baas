import CustomerReviewCard from "@/components/reviews/CustomerReviewCard";
import { CustomerReview } from "@/types/types";
import { Card, CardHeader, Chip } from "@nextui-org/react";
import { MdComment } from "react-icons/md";

async function getLatestReviews() {
  try {
    const res = await fetch("http://localhost:3000/api/reviews", {
      cache: "no-cache",
    });
    return res.json();
  } catch (err) {
    return undefined;
  }
}
export default async function Home() {
  const reviews = await getLatestReviews();
  console.log(reviews)
  return (
    <main className="px-3 lg:px-12">
      <h1>Dashboard</h1>
      <Card className="my-2 pb-6 px-3 lg:px-8 bg-primary dark:bg-bg-dark">
        <CardHeader>
          <Chip size="lg" variant="shadow">
            <span className="flex gap-2 font-bold items-center">
              <MdComment size={25} />
              Recent Reviews:
            </span>
          </Chip>
        </CardHeader>
        <CustomerReviewCard reviews={[]} />
      </Card>
    </main>
  );
}
