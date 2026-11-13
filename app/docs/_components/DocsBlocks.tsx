// Building blocks shared by the docs pages. Each one was defined identically
// in several pages; pages with their own variant of a block keep it locally.
import * as React from "react";
import { CheckCircle2 } from "lucide-react";

export function Step({ number, title, description, children }: { number: number; title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="w-8 h-8 rounded-full bg-accent-700 dark:bg-accent-dark-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-neutral-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        {children}
      </div>
    </div>
  );
}

export function TroubleshootItem({ problem, solutions }: { problem: string; solutions: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">{problem}</h4>
      <ul className="space-y-1">
        {solutions.map((solution, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="text-neutral-400 mt-1">•</span>
            {solution}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
      <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-400">
        {icon}
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{label}</p>
      <p className="font-semibold text-neutral-900 dark:text-white">{value}</p>
    </div>
  );
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <pre
      className={`p-3 rounded-lg bg-neutral-900 dark:bg-neutral-950 text-neutral-100 text-xs font-mono overflow-x-auto ${className ?? ""}`}
    >
      <code>{code}</code>
    </pre>
  );
}

export function VerifyStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
        {number}
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 pt-0.5">{text}</p>
    </div>
  );
}

export function UseCase({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <CheckCircle2 className="w-5 h-5 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-neutral-900 dark:text-white">{title}</h4>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>
    </div>
  );
}

export function WindowsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

export function LinuxIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.002c-.06-.135-.12-.2-.184-.268-.257-.335-.444-.268-.564-.135-.39.401-1.298.536-2.25.469-.665-.135-1.121-.267-1.666-.468-.57-.2-1.128-.464-1.808-.799h-.005l-.049-.025h-.018c-.07-.04-.138-.073-.2-.108l-.062-.045c-.078-.046-.137-.075-.18-.087-.1-.043-.138-.043-.188-.043h-.026c-.188 0-.554.135-.962.4-.467.334-.969.668-1.373.8-.732.2-1.327.066-1.732-.333-.8-.869-1.009-2.534-.623-3.835.387-1.306 1.248-2.402 1.955-3.168.088-.135.136-.2.181-.268.096-.135.18-.27.313-.538.133-.27.36-.599.53-.867.164-.27.29-.4.39-.465.09-.065.136-.065.2-.065.09 0 .2.065.331.198.065.065.155.133.264.268.085.068.192.168.316.401h.002l.052.063v.015c.043.063.088.135.135.198.075.135.112.135.199.135.068 0 .135 0 .2-.065.07-.066.13-.135.195-.2.065-.065.135-.065.26-.065.136 0 .272.065.465.2h.005c.39.27.714.469 1.09.801.4.332.804.668 1.094.935l.052.064v-.003c.126.135.252.2.405.2.116 0 .155-.065.155-.133v-.003z"/>
    </svg>
  );
}
