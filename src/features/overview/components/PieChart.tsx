"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetInvoiceOverview } from "../hooks";

/* ---------------------------------- */
/* Status → color mapping (scales well) */
/* ---------------------------------- */
const STATUS_COLORS: Record<string, string> = {
  draft: "var(--color-info-300)",
  sent: "var(--color-info-600)",
  paid: "var(--color-success-500)",
  overdue: "var(--color-danger-500)",
};

const getStatusColor = (status: string) =>
  STATUS_COLORS[status.toLowerCase()] ?? "var(--color-primary-300)";

/* ---------------------------------- */
/* Month options */
/* ---------------------------------- */
const MONTHS = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

/* ---------------------------------- */

export function ChartPieInteractive() {
  const id = "pie-interactive";

  const [activeMonth, setActiveMonth] = React.useState<string>("january");
  const [activeStatus, setActiveStatus] = React.useState<string>();

  const { data, isPending } = useGetInvoiceOverview(activeMonth);

  /* ---------------------------------- */
  /* Transform backend data → chart data */
  /* ---------------------------------- */
  const chartData = React.useMemo(() => {
    if (!data) return [];

    return data.map((item: { status: string; value: number }) => ({
      status: item.status.toLowerCase(),
      label: item.status,
      value: item.value,
      fill: getStatusColor(item.status),
    }));
  }, [data]);

  /* ---------------------------------- */
  /* Chart config generated dynamically */
  /* ---------------------------------- */
  const chartConfig = React.useMemo<ChartConfig>(() => {
    const config: ChartConfig = {
      value: { label: "Invoices" },
    };

    chartData.forEach(
      (item: { status: string | number; label: any; fill: any }) => {
        config[item.status] = {
          label: item.label,
          color: item.fill,
        };
      },
    );

    return config;
  }, [chartData]);

  /* ---------------------------------- */
  /* Active slice logic (safe) */
  /* ---------------------------------- */
  React.useEffect(() => {
    if (!activeStatus && chartData.length) {
      setActiveStatus(chartData[0].status);
    }
  }, [chartData, activeStatus]);

  const activeIndex = React.useMemo(() => {
    return (
      chartData.findIndex(
        (i: { status: string | undefined }) => i.status === activeStatus,
      ) || 0
    );
  }, [chartData, activeStatus]);

  return (
    <Card data-chart={id} className="flex flex-col pt-6 pb-7">
      <ChartStyle id={id} config={chartConfig} />

      <CardHeader className="flex items-center space-y-0 pb-4">
        <div className="grid gap-1">
          <CardTitle>Invoice Status</CardTitle>
        </div>

        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select month"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>

          <SelectContent align="end" className="rounded-xl">
            {MONTHS.map((month) => (
              <SelectItem
                key={month.value}
                value={month.value}
                className="rounded-lg"
              >
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        {isPending ? (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : !chartData.length ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-center">
              <p className="text-muted-foreground">No invoice data</p>
              <p className="text-sm text-muted-foreground mt-1">
                for {MONTHS.find((m) => m.value === activeMonth)?.label}
              </p>
            </div>
          </div>
        ) : (
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {chartData[activeIndex]?.value ?? 0}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Invoices
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
