import { POPULER_PACKAGES } from "@/constant";
import { childVariant, parentVariant } from "@/utils/animations";
import * as motion from "motion/react-client";

export default function UpcommingPackages() {
  return (
    <motion.ul
      variants={parentVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-4 gap-10 w-full max-sm:grid-cols-1"
    >
      {POPULER_PACKAGES.slice(0, 4).map((item) => (
        <motion.li
          key={item.id}
          variants={childVariant}
          // className="w-full h-80 overflow-hidden rounded-[.8rem] relative shadow-2xl group/item max-sm:h-[17rem]"
        >
          {/* <PackageItem option={item} /> */}
          {/* <NewPackageListItem /> */}
        </motion.li>
      ))}
    </motion.ul>
  );
}
