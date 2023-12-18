"use client";
import React, { FC } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { BreadCrumbType } from "@/types/types";

interface BreadCrumbProps {
  breadCrumb: BreadCrumbType[];
}

export default function BreadCrumb({ breadCrumb }: BreadCrumbProps) {
  return (
    <Breadcrumbs>
      {breadCrumb &&
        breadCrumb.map((item) =>
          item.href ? (
            <BreadcrumbItem href={item.href} key={item.title}> {item.title} </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={item.title}>{item.title}</BreadcrumbItem>
          )
        )}
    </Breadcrumbs>
  );
}
