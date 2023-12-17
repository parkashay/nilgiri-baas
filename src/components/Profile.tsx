import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import ThemeSwitch from "./atoms/ThemeSwitch";

export default function Profile() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="cursor-pointer"/>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="delete" className="text-danger" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
