import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Accordion as FumadocsAccordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card as FumadocsCard, Cards } from 'fumadocs-ui/components/card';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import {
  BookOpen,
  Code2,
  Cog,
  Cpu,
  Rocket,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  gear: Cog,
  github: Code2,
  microchip: Cpu,
  rocket: Rocket,
  terminal: Terminal,
};

function resolveIcon(icon: ReactNode): ReactNode {
  if (typeof icon !== 'string') {
    return icon;
  }

  const Icon = iconMap[icon.toLowerCase()];

  if (!Icon) {
    return icon;
  }

  return <Icon aria-hidden="true" className="size-4" />;
}

function Card({ icon, ...props }: ComponentProps<typeof FumadocsCard>) {
  return <FumadocsCard icon={resolveIcon(icon)} {...props} />;
}

function CardGroup({
  cols: _cols,
  ...props
}: ComponentProps<typeof Cards> & {
  cols?: number;
}) {
  return <Cards {...props} />;
}

function Accordion({
  defaultOpen: _defaultOpen,
  icon,
  title,
  ...props
}: ComponentProps<typeof FumadocsAccordion> & {
  defaultOpen?: boolean;
  icon?: ReactNode;
}) {
  const resolvedIcon = resolveIcon(icon);
  const resolvedTitle = resolvedIcon ? (
    <span className="inline-flex items-center gap-2">
      <span className="text-fd-muted-foreground [&_svg]:size-4">
        {resolvedIcon}
      </span>
      <span>{title}</span>
    </span>
  ) : (
    title
  );

  return <FumadocsAccordion title={resolvedTitle} {...props} />;
}

function Frame({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'not-prose my-6 overflow-hidden rounded-xl border bg-fd-card shadow-sm',
        className,
      )}
      {...props}
    >
      <div className="[&_img]:block [&_img]:w-full">{children}</div>
    </div>
  );
}

function Warning(props: ComponentProps<typeof Callout>) {
  return <Callout type="warning" {...props} />;
}

function Note(props: ComponentProps<typeof Callout>) {
  return <Callout type="info" {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    AccordionGroup: Accordions,
    Callout,
    Card,
    Cards,
    CardGroup,
    Frame,
    Note,
    Tab,
    Tabs,
    Warning,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
