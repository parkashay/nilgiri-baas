import CustomerReviewCard from "@/components/reviews/CustomerReviewCard";
import { CustomerReview } from "@/types/types";
import { Card, CardHeader, Chip } from "@nextui-org/react";
import { MdComment } from "react-icons/md";

const reviews: CustomerReview[] = [
  {
    name: "Malati Adhikari",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 1.3,
    comment: "This website sucks",
    date: "2025/12/12",
    email: "malatikobhatti@gmail.com",
  },
  {
    name: "Saili OP",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 4.5,
    comment: "ramaako ramai ho 40 katesi",
    date: "2040/40/40",
    email: "sailakosaili@gmail.com",
  },
  {
    name: "Harimaya Rimal",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 4.5,
    comment:
      "Kaam raincha yr. ekchhin jhan hotel ma gayera raila hanam vaneko sala paisa matra badhi liyo majjai ayena.",
    date: "2040/40/40",
    email: "sailakosaili@gmail.com",
  },
];

export default function Home() {
  return (
    <main className="px-3 lg:px-12">
      <h1>Dashboard</h1>
      <Card className="my-2 pb-6 px-3 lg:px-8 bg-primary dark:bg-bg-dark">
        <CardHeader>
          <Chip size="lg" variant="shadow">
            <span className="flex gap-2 font-bold items-center"><MdComment size={25} />
            Recent Reviews:</span>
          </Chip>
        </CardHeader>
        <CustomerReviewCard reviews={reviews} />
      </Card>
    </main>
  );
}
