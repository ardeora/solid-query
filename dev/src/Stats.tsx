import { AiOutlineTwitter } from "solid-icons/ai";
import { HiSolidArrowSmDown, HiSolidArrowSmUp } from "solid-icons/hi";
import { RiSystemLoader4Fill } from "solid-icons/ri";
import { Component, createEffect, JSX, Show } from "solid-js";
import { createQuery } from "../../src";

interface StatsProps {
  value: string;
  label: string;
  change: number;
  trend: "up" | "down";
  icon: JSX.Element;
}

const Stats: Component<StatsProps> = (props) => {
  return (
    <div class="h-16 flex gap-5">
      <div class="aspect-square flex items-center justify-center">{props.icon}</div>
      <div class="flex-1 flex flex-col">
        <div class="font-semibold text-gray-500">{props.label}</div>
        <div class="flex-1 flex gap-2 items-end">
          <div class="text-3xl text-gray-700">{props.value}</div>
          <div class="flex ">
            <div>
              {props.trend === "up" ? (
                <HiSolidArrowSmUp class="text-green-500" size={24} />
              ) : (
                <HiSolidArrowSmDown class="text-red-500" size={24} />
              )}
            </div>
            <div class={`font-bold ${props.trend === "down" ? "text-red-500" : "text-green-500"} `}>
              {props.change}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
