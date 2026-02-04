import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDown, TrendingUp } from "lucide-react";

// Temporary data for different time periods and property types
const generateData = (
  period: string,
  propertyType: "flat" | "builder"
) => {
  const baseMultiplier = propertyType === "flat" ? 1 : 0.85;
  
  if (period === "last-1-year") {
    return [
      { year: "Feb '25", rate: Math.round(10800 * baseMultiplier) },
      { year: "May '25", rate: Math.round(11000 * baseMultiplier) },
      { year: "Aug '25", rate: Math.round(11200 * baseMultiplier) },
      { year: "Nov '25", rate: Math.round(11500 * baseMultiplier) },
      { year: "Feb '26", rate: Math.round(11800 * baseMultiplier) },
    ];
  } else if (period === "last-3-years") {
    return [
      { year: "2023", rate: Math.round(8800 * baseMultiplier) },
      { year: "2023.5", rate: Math.round(9000 * baseMultiplier) },
      { year: "2024", rate: Math.round(9400 * baseMultiplier) },
      { year: "2024.5", rate: Math.round(10200 * baseMultiplier) },
      { year: "2025", rate: Math.round(11000 * baseMultiplier) },
      { year: "2025.5", rate: Math.round(11500 * baseMultiplier) },
      { year: "2026", rate: Math.round(11800 * baseMultiplier) },
    ];
  } else {
    // last-5-years (default)
    return [
      { year: "2022", rate: Math.round(8100 * baseMultiplier) },
      { year: "2022.5", rate: Math.round(8300 * baseMultiplier) },
      { year: "2023", rate: Math.round(8500 * baseMultiplier) },
      { year: "2023.5", rate: Math.round(8700 * baseMultiplier) },
      { year: "2024", rate: Math.round(9200 * baseMultiplier) },
      { year: "2024.5", rate: Math.round(10000 * baseMultiplier) },
      { year: "2025", rate: Math.round(11000 * baseMultiplier) },
      { year: "2025.5", rate: Math.round(11100 * baseMultiplier) },
      { year: "2026", rate: Math.round(11800 * baseMultiplier) },
    ];
  }
};

const getStats = (propertyType: "flat" | "builder", period: string) => {
  const baseRate = propertyType === "flat" ? 11800 : 10030;
  const baseGrowth = period === "last-5-years" ? 45.7 : period === "last-3-years" ? 34.1 : 9.3;
  
  return {
    avgRate: baseRate,
    growth: baseGrowth,
    rentalYield: propertyType === "flat" ? 3.0 : 3.2,
  };
};

export default function Index() {
  const [timePeriod, setTimePeriod] = useState<"last-1-year" | "last-3-years" | "last-5-years">("last-5-years");
  const [propertyType, setPropertyType] = useState<"flat" | "builder">("flat");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const chartData = useMemo(
    () => generateData(timePeriod, propertyType),
    [timePeriod, propertyType]
  );

  const stats = useMemo(
    () => getStats(propertyType, timePeriod),
    [propertyType, timePeriod]
  );

  const periodLabels = {
    "last-1-year": "Last 1 Year",
    "last-3-years": "Last 3 Years",
    "last-5-years": "Last 5 Years",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8 mb-8">
          {/* Title and Filter */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#2C3E50] leading-tight mb-3">
              Property Rates in Financial District, Hyderabad
            </h1>
            
            {/* Time Period Dropdown */}
            <div className="relative inline-block mt-4">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-[#5A6C7D] text-base lg:text-lg font-normal hover:text-[#2C3E50] transition-colors"
              >
                <span>Showing for</span>
                <span className="font-semibold text-[#2C3E50]">
                  {periodLabels[timePeriod]}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-full mt-2 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-10 min-w-[180px]">
                  {(Object.keys(periodLabels) as Array<keyof typeof periodLabels>).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTimePeriod(key);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-[#F3F4F6] transition-colors ${
                        timePeriod === key ? 'bg-[#F3F4F6] text-[#2C3E50] font-semibold' : 'text-[#5A6C7D]'
                      }`}
                    >
                      {periodLabels[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="bg-[#F3F4F6] rounded-lg px-6 lg:px-8 py-4 flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center">
            <div className="flex flex-col">
              <div className="text-2xl lg:text-3xl font-bold text-[#2C3E50]">
                ₹{stats.avgRate.toLocaleString('en-IN')}/-
              </div>
              <div className="text-sm text-[#6B7280] mt-1">
                Avg. rate/sq.ft
              </div>
              <div className="text-xs text-[#9CA3AF] mt-0.5">
                (Super Built up Area)
              </div>
            </div>

            <div className="w-px h-12 bg-[#D1D5DB] hidden sm:block" />

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-2xl lg:text-3xl font-bold text-[#10B981]">
                <TrendingUp className="w-5 h-5" />
                {stats.growth}%
              </div>
              <div className="text-sm text-[#6B7280] mt-1">
                in {periodLabels[timePeriod]}
              </div>
            </div>

            <div className="w-px h-12 bg-[#D1D5DB] hidden sm:block" />

            <div className="flex flex-col">
              <div className="text-2xl lg:text-3xl font-bold text-[#2C3E50]">
                {stats.rentalYield}%
              </div>
              <div className="text-sm text-[#6B7280] mt-1">
                Rental Yield
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-[#9CA3AF] text-base leading-relaxed">
            Financial District, Hyderabad is one of the popular areas in the city. This area of the city has over 173{" "}
            {showFullDescription ? (
              <>
                properties listed for sale and rent. The area is well connected to other parts of the city via road and metro. 
                It houses several IT companies and is a preferred residential location for professionals working in the area.
              </>
            ) : (
              "..."
            )}
            {" "}
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-[#2C3E50] font-medium hover:underline"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          </p>
        </div>

        {/* Property Type Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setPropertyType("flat")}
            className={`px-6 py-2.5 rounded-full text-sm lg:text-base font-medium transition-all ${
              propertyType === "flat"
                ? "bg-[#E0E7FF] text-[#2C3E50] shadow-sm"
                : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-[#F9FAFB]"
            }`}
          >
            Flat/Apartment
          </button>
          <button
            onClick={() => setPropertyType("builder")}
            className={`px-6 py-2.5 rounded-full text-sm lg:text-base font-medium transition-all ${
              propertyType === "builder"
                ? "bg-[#E0E7FF] text-[#2C3E50] shadow-sm"
                : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-[#F9FAFB]"
            }`}
          >
            Builder Floor
          </button>
        </div>

        {/* Chart */}
        <div className="w-full h-[400px] sm:h-[450px] lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#86EFAC" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#86EFAC" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 14 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#ACAFB6", fontSize: 16 }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                dx={-5}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                labelStyle={{ color: "#2C3E50", fontWeight: 600 }}
                itemStyle={{ color: "#10B981" }}
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}/sq.ft`, "Rate"]}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#22C55E"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRate)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
