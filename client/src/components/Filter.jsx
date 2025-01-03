import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Filter() {
  const [date, setDate] = useState();

  return (
    <div className="w-[300px] space-y-4 border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Filter</h3>
        <Button variant="link" className="text-red-500">
          Clear all
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Problem Status</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="open" defaultChecked />
              <label htmlFor="open">Open</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-progress" defaultChecked />
              <label htmlFor="in-progress">In Progress</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="completed" />
              <label htmlFor="completed">Completed</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="closed" />
              <label htmlFor="closed">Closed</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="canceled" />
              <label htmlFor="canceled">Canceled</label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Problem Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Empty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Budget Range (DZD)</Label>
          <div className="flex space-x-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Empty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="min">Min</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Empty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="max">Max</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Timeline/Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "MM/DD/YYYY"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Sort by</Label>
          <RadioGroup defaultValue="most-recent">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="most-recent" id="most-recent" />
              <Label htmlFor="most-recent">Most Recent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="budget" id="budget" />
              <Label htmlFor="budget">Budget</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="deadline" id="deadline" />
              <Label htmlFor="deadline">Deadline</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="most-viewed" id="most-viewed" />
              <Label htmlFor="most-viewed">Most Viewed</Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full">Search</Button>
      </div>
    </div>
  );
}
