import { useState } from "react";

/** Hidden field bots fill in but real visitors never see or tab to — pairs
 *  with the `_hp` check in submitForm. Render `field` inside the <form>,
 *  and pass `value` as `_hp` in the submitted data. */
export function useHoneypot() {
  const [value, setValue] = useState("");

  const field = (
    <input
      type="text"
      name="company"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
    />
  );

  return { value, field };
}
