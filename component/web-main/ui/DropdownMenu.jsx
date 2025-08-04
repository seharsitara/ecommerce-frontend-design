"use client";

import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { twMerge } from "tailwind-merge";

export default function DropdownMenu({ trigger, items, align = "start", sideOffset = 4, className = "" }) {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          align={align}
          sideOffset={sideOffset}
          className={twMerge(
            "z-50 min-w-[180px] rounded-md bg-white p-1 shadow-lg border border-gray-100",
            className
          )}
        >
          {items.map((item, idx) =>
            item.separator ? (
              <RadixDropdownMenu.Separator
                key={idx}
                className="my-1 h-px bg-gray-200"
              />
            ) : (
              <RadixDropdownMenu.Item
                key={typeof item.label === 'string' ? item.label : idx}
                onSelect={item.onSelect}
                disabled={item.disabled}
                className={twMerge(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 cursor-pointer select-none outline-none transition-colors",
                  "focus:bg-blue-50 focus:text-blue-700",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.label}
              </RadixDropdownMenu.Item>
            )
          )}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
} 