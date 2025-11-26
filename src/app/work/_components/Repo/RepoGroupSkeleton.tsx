import classNames from "classnames";

import H3 from "@/components/core/H3";
import Card, { CardBody, CardDetails } from "@/components/elements/Card";

const TEXT = "▓▒░▓▒░"; // █

const Blob = ({ className }: { className?: string }) => (
  <span
    className={classNames(
      "inline-block text-gray-500 opacity-10 overflow-y-hidden",
      className,
    )}
  >
    {TEXT}
  </span>
);

export default function RepoGroupSkeleton({
  title,
  hideDetails = false,
}: {
  title: string | React.ReactNode;
  hideDetails?: boolean;
}) {
  return (
    <div className="mb-4">
      <H3 className="flex flex-row items-center">
        <span className="flex-1">{title}</span>
        <span className="text-xs font-normal flex flex-row">
          <span className="count">&times; of &times;</span>
          <div className="mx-1 text-gray-400">|</div>
          <span className="text-gray-500">See all ↗︎</span>
        </span>
      </H3>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((id) => (
          <Card key={id}>
            <CardBody className="text-sm">
              <Blob className="w-6 mr-1" />
              <Blob className="w-3 mr-1" />
              <Blob className="w-12" />
            </CardBody>
            {!hideDetails && (
              <CardDetails className="flex flex-row justify-end items-center text-xs">
                <Blob className="h-3 w-3" />
                <span className="separator">|</span>
                <Blob className="h-3 w-3" />
              </CardDetails>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
