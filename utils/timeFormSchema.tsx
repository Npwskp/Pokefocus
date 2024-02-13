import * as z from "zod";

const e = {
  invalid_type_error: "Invalid Number",
  required_error: "Number is required",
};

function en(num: number) {
  return {
    message: `Enter num > ${num}`,
  };
}

export const formSchema = z.object({
  dhour: z.number(e).min(0, en(0)),
  dminute: z.number(e).min(0, en(0)).max(60),
  dsecond: z.number(e).min(0, en(0)).max(60),
  rhour: z.number(e).min(0, en(0)),
  rminute: z.number(e).min(0, en(0)).max(60),
  rsecond: z.number(e).min(0, en(0)).max(60),
});
