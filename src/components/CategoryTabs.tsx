
"use client";

import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

const tabs = [
  {
    id: 0,
    label: "Pão",
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 1,
    label: "Fast Food",
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 2,
    label: "Bolos",
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center'
  },
  {
    id: 3,
    label: "Bebidas",
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=100&h=100&fit=crop&crop=center'
  }
];

function NewBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-primary px-2 py-1 rounded-t-full rounded-br-full rounded-bl-sm text-xs font-bold text-primary-foreground transition-all duration-200 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:z-[1] before:shadow-[inset_0_0_0_1px_rgba(170,202,255,0.2),inset_0_0_10px_0_rgba(170,202,255,0.3),inset_0_3px_7px_0_rgba(170,202,255,0.4),inset_0_-4px_3px_0_rgba(170,202,255,0.4),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.65)]  backdrop-blur-md",
        className
      )}
    >
      <span>NEW</span>
      <span
        className="absolute left-1/2 -translate-x-1/2 opacity-40 z-50 scale-y-[-1] translate-y-2.5"
        style={{
          maskImage: "linear-gradient(to top, white 20%, transparent 50%)",
          WebkitMaskImage:
            "linear-gradient(to top, white 10%, transparent 50%)",
        }}
      >
        NEW
      </span>
    </div>
  );
}

export const CategoryTabs = ({ className }: { className?: string }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTab) {
      setActiveTab(newTabId);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className={cn("flex justify-between space-x-2 px-4", className)}>
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            whileTap={"tapped"}
            whileHover={"hovered"}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "relative flex flex-col items-center cursor-pointer text-neutral-600 dark:text-neutral-300 transition focus-visible:outline-1 focus-visible:ring-1 focus-visible:outline-none",
              activeTab === tab.id
                ? "text-black dark:text-white font-medium"
                : "hover:text-neutral-800 dark:hover:text-neutral-200 text-neutral-500 dark:text-neutral-400"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className="absolute -bottom-2 w-full left-0 z-10 bg-green-500 rounded-full h-1"
                transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
              />
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  type: "spring",
                  bounce: 0.2,
                  damping: 7,
                  duration: 0.4,
                  delay: index * 0.1,
                },
              }}
              variants={{
                default: { scale: 1 },
                ...(!(activeTab === tab.id) && { hovered: { scale: 1.05 } }),
                ...(!(activeTab === tab.id) && {
                  tapped: {
                    scale: 0.9,
                    transition: {
                      type: "spring",
                      bounce: 0.2,
                      damping: 7,
                      duration: 0.4,
                    },
                  },
                }),
              }}
              className="relative"
              transition={{ type: "spring" }}
            >
              {tab.id === 1 && (
                <NewBadge className="absolute -top-2 -right-2 z-50" />
              )}

              <div className="w-16 h-16 rounded-full overflow-hidden mb-1 shadow-md">
                <img
                  src={tab.image}
                  alt={tab.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
