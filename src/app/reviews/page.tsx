import CustomerReviewCard from "@/components/reviews/CustomerReviewCard";
import React from "react";

async function getReviews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
      cache: "no-cache",
    });
    return res.json();
  } catch (err) {
    return undefined;
  }
}

const page = async () => {
  const reviews = await getReviews();
  return (
    <section className="px-3 lg:px-12">
      <h1>Reviews</h1>
      <div className="my-6">
        <CustomerReviewCard reviews={reviews?.length ? reviews : []} />
      </div>
    </section>
  );
};

export default page;
