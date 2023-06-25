import { container } from "tsyringe";

import { DayJSProvider } from "./implementations/DayJSProvider";
import { IDayJSProvider } from "./repositories/IDayJSProvider";

container.registerSingleton<IDayJSProvider>(
  "DayJSProvider",
  DayJSProvider,
);
