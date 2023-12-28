"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { MdCalendarToday, MdHotel, MdStar } from "react-icons/md";
import { CustomerReview } from "@/types/types";

interface CustomerReviewProps {
  reviews: CustomerReview[];
}

export default function CustomerReviewCard({ reviews }: CustomerReviewProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const pages = Math.ceil(reviews?.length / itemsPerPage);

  const displayedReviews = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return reviews.slice(start, end);
  }, [reviews, page]);
  return (
    displayedReviews?.length > 0 && (
      <>
        <section className="flex gap-3 flex-wrap justify-center">
          {displayedReviews.map((review) => (
            <Card key={review.id} className="max-w-[500px] flex-grow ">
              <CardHeader className="justify-between gap-3">
                <div className="flex gap-5">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={review.customer.avatar}
                    showFallback
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {review.customer.name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      {review.customer.email || review.customer.phone}
                    </h5>
                  </div>
                </div>
                <Chip
                  color={review.star >= 3 ? "warning" : "danger"}
                  radius="full"
                  size="sm"
                  variant="flat"
                >
                  <span className="flex gap-2 items-center">
                    {review.star}
                    <MdStar />
                  </span>
                </Chip>
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>{review.comment}</p>
              </CardBody>
              <CardFooter className="gap-3">
                <div className="flex gap-1 items-center">
                  <MdCalendarToday />
                  <p className=" text-small">
                    {String(new Date(review.date).toDateString())}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <MdHotel />
                  <p className=" text-small">{review.room.number}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </section>
        <div className="flex justify-center my-2">
          {
            displayedReviews.length > 5 && <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
          }
        </div>
      </>
    )
  );
}
