import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { GithubLogo } from '@phosphor-icons/react/ssr';
import { Wordmark } from '@/components/wordmark';
import { sloposGitHubUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark className="h-[22px] w-auto" />,
      url: '/',
      children: (
        <a
          href={sloposGitHubUrl}
          aria-label="SlopOS on GitHub"
          title="SlopOS on GitHub"
          target="_blank"
          rel="noreferrer"
          className="me-1 inline-flex size-8 items-center justify-center rounded-[4px] text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          <GithubLogo size={16} weight="fill" />
        </a>
      ),
    },
    githubUrl: sloposGitHubUrl,
    themeSwitch: { enabled: false },
  };
}
