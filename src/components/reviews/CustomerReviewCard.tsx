"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { MdCalendarToday, MdStar } from "react-icons/md";
import { CustomerReview } from "@/types/types";

interface CustomerReviewProps {
  reviews: CustomerReview[];
}

export default function CustomerReviewCard({ reviews }: CustomerReviewProps) {
  const rating = 3.5;
  return (
    reviews?.length > 0 && (
      <section className="flex gap-3 flex-wrap">
        {reviews.map((review, idx) => (
          <Card key={`review-${idx}`} className="max-w-[400px] flex-grow ">
            <CardHeader className="justify-between gap-3">
              <div className="flex gap-5">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={review.avatar}
                  showFallback
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {review.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {review.email}
                  </h5>
                </div>
              </div>
              <Chip
                color={rating >= 3 ? "warning" : "danger"}
                radius="full"
                size="sm"
                variant="flat"
              >
                <span className="flex gap-2 items-center">
                  {rating}
                  <MdStar />
                </span>
              </Chip>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>
                {review.comment}
              </p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1 items-center">
                <MdCalendarToday/>
                <p className=" text-small">{review.date}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
    )
  );
}
