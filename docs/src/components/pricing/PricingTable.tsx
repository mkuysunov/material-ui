import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Link from 'docs/src/modules/components/Link';
import IconImage, { IconImageProps } from 'docs/src/components/icon/IconImage';
import LaunchRounded from '@mui/icons-material/LaunchRounded';
import UnfoldMoreRounded from '@mui/icons-material/UnfoldMoreRounded';

const planInfo = {
  community: {
    color: 'green',
    title: 'Community',
    description:
      'Get started with the industry-standard UI library for building React user interfaces.',
  },
  pro: {
    color: 'blue',
    title: 'Pro',
    description: 'Best for professional developers building enterprise or data-rich applications.',
  },
  premium: {
    color: 'gold',
    title: 'Premium',
    description: 'Unlock all the most advanced features including premium support.',
  },
} as const;

export function PlanName({
  plan,
  centered = false,
  disableDescription = false,
}: {
  plan: 'community' | 'pro' | 'premium';
  centered?: boolean;
  disableDescription?: boolean;
}) {
  const { title, color, description } = planInfo[plan];
  return (
    <React.Fragment>
      {centered ? (
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <IconImage name={`block-${color}` as IconImageProps['name']} sx={{ mr: 1 }} /> {title}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {title} <IconImage name={`block-${color}` as IconImageProps['name']} />
        </Typography>
      )}
      {!disableDescription && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: { md: 63 } }}>
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}

export function PlanPrice({ plan }: { plan: 'community' | 'pro' | 'premium' }) {
  if (plan === 'community') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
        <Typography variant="h4" component="div" fontWeight="bold" color="success.600">
          $0
        </Typography>
        <Box sx={{ width: 5 }} />
        <Typography variant="body2" color="text.secondary">
          – free forever.
        </Typography>
      </Box>
    );
  }
  if (plan === 'pro') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
        <Typography
          variant="body2"
          fontWeight="bold"
          color="error.500"
          sx={{
            borderRadius: 0.5,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.900' : 'error.100'),
            // bgcolor: 'error.200',
            textDecoration: 'line-through',
            p: '4px',
          }}
        >
          $249
        </Typography>
        <Box sx={{ width: 10 }} />
        <Typography variant="h4" component="div" fontWeight="bold" color="primary.main">
          $186
        </Typography>
        <Box sx={{ width: 5 }} />
        <Typography variant="body2" color="text.secondary">
          / developer.
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2 }}>
      <Typography variant="h4" component="div" fontWeight="bold" color="grey.600">
        $599
      </Typography>
      <Box sx={{ width: 5 }} />
      <Typography variant="body2" color="text.secondary">
        / developer.
      </Typography>
    </Box>
  );
}

const Info = ({ value, metadata }: { value: React.ReactNode; metadata?: string }) => {
  return (
    <React.Fragment>
      {typeof value === 'string' ? <Typography variant="body2">{value}</Typography> : value}
      {metadata && (
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="normal"
          sx={{ display: 'block', mt: 0.8, textAlign: 'center' }}
        >
          {metadata}
        </Typography>
      )}
    </React.Fragment>
  );
};
const ColumnHead = ({
  label,
  metadata,
  tooltip,
  nested = false,
  href,
}: {
  label: string;
  metadata?: string;
  tooltip?: string;
  nested?: boolean;
  href?: string;
}) => {
  const text = (
    <Typography
      {...(href && {
        component: Link,
        href,
        target: '_blank',
      })}
      variant="body2"
      sx={{
        '&:hover > svg': { color: 'primary.main' },
        ...(href && {
          fontWeight: 500,
          '&:hover > svg': {
            opacity: 1,
            ml: 0.5,
          },
        }),
      }}
    >
      {label}{' '}
      {href && (
        <LaunchRounded color="primary" sx={{ fontSize: 14, opacity: 0, transition: '0.3s' }} />
      )}
      {tooltip && (
        <InfoOutlinedIcon
          sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5, color: 'text.secondary' }}
        />
      )}
    </Typography>
  );
  return (
    <Box sx={{ pl: nested ? 2.5 : 1, pr: 1, alignSelf: 'center', justifySelf: 'flex-start' }}>
      {tooltip ? (
        <Tooltip title={tooltip} placement="right" describeChild>
          {text}
        </Tooltip>
      ) : (
        text
      )}
      {metadata && (
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="normal"
          sx={{ display: 'block' }}
        >
          {metadata}
        </Typography>
      )}
    </Box>
  );
};

const ColumnHeadHighlight = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      p: 2,
      position: 'relative',
      borderRadius: '10px 10px 0 0',
      borderWidth: '1px 1px 0 1px',
      borderStyle: 'solid',
      borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200'),
      bgcolor: (theme) =>
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.primaryDark[900], 0.5)
          : alpha(theme.palette.grey[50], 0.5),
      ...props.sx,
    }}
  />
);

const Recommended = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      typography: 'caption',
      color: 'primary.500',
      p: '2px 8px',
      border: '1px solid',
      borderRadius: 2,
      borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primary.700' : 'primary.200'),
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.50'),
      position: 'absolute',
      top: 0,
      left: 20,
      transform: 'translateY(-50%)',
      ...props.sx,
    }}
  >
    Recommended
  </Box>
);

const Cell = ({ highlighted = false, ...props }: BoxProps & { highlighted?: boolean }) => (
  <Box
    {...props}
    sx={{
      py: 2,
      px: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      ...(highlighted && {
        borderWidth: '0 1px 0 1px',
        borderStyle: 'solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200'),
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[900], 0.5)
            : alpha(theme.palette.grey[50], 0.5),
      }),
      ...props.sx,
    }}
  />
);

const RowHead = ({
  children,
  startIcon,
  ...props
}: BoxProps & { startIcon?: React.ReactElement }) => (
  <Box
    {...props}
    sx={{
      justifyContent: 'flex-start',
      borderRadius: 1,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
      p: 1,
      transition: 'none',
      typography: 'body2',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      ...props.sx,
    }}
  >
    {startIcon && <Box sx={{ lineHeight: 0, mr: 1 }}>{startIcon}</Box>}
    {children}
  </Box>
);

function getUrl(hash: string) {
  return `https://mui.com/components/data-grid${hash}`;
}

const rowHeaders: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': (
    <ColumnHead
      {...{
        label: '@mui/base',
        tooltip: 'The unstyled components and react hooks.',
      }}
    />
  ),
  '@mui/unstyled': (
    <ColumnHead
      {...{ label: '@mui/material', tooltip: 'Core components following Material Design.' }}
    />
  ),
  '@mui/system': (
    <ColumnHead
      {...{
        label: '@mui/system',
        tooltip: 'CSS utilities for rapidly laying out custom designs.',
      }}
    />
  ),
  // Advanced
  'data-grid/column-groups': (
    <ColumnHead label="Column groups" nested href={getUrl('/columns/#column-groups')} />
  ),
  'data-grid/column-spanning': (
    <ColumnHead label="Column spanning" nested href={getUrl('/columns/#column-spanning')} />
  ),
  'data-grid/column-resizing': (
    <ColumnHead label="Column resizing" nested href={getUrl('/columns/#resizing')} />
  ),
  'data-grid/column-reorder': (
    <ColumnHead label="Column reorder" nested href={getUrl('/columns/#column-reorder')} />
  ),
  'data-grid/column-pinning': (
    <ColumnHead label="Column pinning" nested href={getUrl('/columns/#column-pinning')} />
  ),
  'data-grid/row-sorting': (
    <ColumnHead label="Row sorting" nested href={getUrl('/rows/#row-sorting')} />
  ),
  'data-grid/row-height': (
    <ColumnHead label="Row height" nested href={getUrl('/rows/#row-height')} />
  ),
  'data-grid/row-spanning': (
    <ColumnHead label="Row spanning" nested href={getUrl('/rows/#row-spanning')} />
  ),
  'data-grid/row-reordering': (
    <ColumnHead label="Row reordering" nested href={getUrl('/rows/#row-reorder')} />
  ),
  'data-grid/row-selection': (
    <ColumnHead label="Row selection" nested href={getUrl('/selection/#row-selection')} />
  ),
  'data-grid/row-multiselection': (
    <ColumnHead
      label="Multi-row selection"
      nested
      href={getUrl('/selection/#multiple-row-selection')}
    />
  ),
  'data-grid/row-rangeselection': (
    <ColumnHead label="Range selection" nested href={getUrl('/selection/#range-selection')} />
  ),
  'data-grid/filter-quick': (
    <ColumnHead label="Quick filter" nested href={getUrl('/filtering/#quick-filter')} />
  ),
  'data-grid/filter-column': (
    <ColumnHead label="Column filters" nested href={getUrl('/filtering/#column-filters')} />
  ),
  'data-grid/filter-multicolumn': (
    <ColumnHead
      label="Multi-column filtering"
      nested
      href={getUrl('/filtering/#multi-column-filtering')}
    />
  ),
  'data-grid/pagination': <ColumnHead label="Pagination" nested href={getUrl('/pagination/')} />,
  'data-grid/pagination-large': (
    <ColumnHead
      label="Pagination > 100 rows per page"
      nested
      href={getUrl('/pagination/#paginate-gt-100-rows')}
    />
  ),
  'data-grid/edit-row': (
    <ColumnHead label="Row editing" nested href={getUrl('/editing/#row-editing')} />
  ),
  'data-grid/edit-cell': (
    <ColumnHead label="Cell editing" nested href={getUrl('/editing/#cell-editing')} />
  ),
  'data-grid/file-csv': (
    <ColumnHead label="CSV export" nested href={getUrl('/export/#csv-export')} />
  ),
  'data-grid/file-print': <ColumnHead label="Print" nested href={getUrl('/export/#print')} />,
  'data-grid/file-clipboard': (
    <ColumnHead label="Clipboard" nested href={getUrl('/export/#clipboard')} />
  ),
  'data-grid/file-excel': (
    <ColumnHead label="Excel export" nested href={getUrl('/export/#excel-export')} />
  ),
  'data-grid/customizable-components': (
    <ColumnHead label="Customizable components" nested href={getUrl('/components/')} />
  ),
  'data-grid/virtualize-column': (
    <ColumnHead
      label="Column virtualization"
      nested
      href={getUrl('/virtualization/#column-virtualization')}
    />
  ),
  'data-grid/virtualize-row': (
    <ColumnHead
      label="Row virtualization > 100 rows"
      nested
      href={getUrl('/virtualization/#row-virtualization')}
    />
  ),
  'data-grid/tree-data': (
    <ColumnHead label="Tree data" nested href={getUrl('/group-pivot/#tree-data')} />
  ),
  'data-grid/master-detail': (
    <ColumnHead label="Master detail" nested href={getUrl('/group-pivot/#master-detail')} />
  ),
  'data-grid/grouping': (
    <ColumnHead label="Grouping" nested href={getUrl('/group-pivot/#grouping')} />
  ),
  'data-grid/aggregation': (
    <ColumnHead label="Aggregation" nested href={getUrl('/group-pivot/#aggregation')} />
  ),
  'data-grid/pivoting': (
    <ColumnHead label="Pivoting" nested href={getUrl('/group-pivot/#pivoting')} />
  ),
  'data-grid/accessibility': (
    <ColumnHead label="Accessibility" nested href={getUrl('/accessibility/')} />
  ),
  'data-grid/keyboard-nav': (
    <ColumnHead
      label="Keyboard navigation"
      nested
      href={getUrl('/accessibility/#keyboard-navigation')}
    />
  ),
  'data-grid/localization': (
    <ColumnHead label="Localization" nested href={getUrl('/localization/')} />
  ),
  'data-grid-pro': <ColumnHead label="Data Grid Pro Updates" />,
  'date-range-picker': <ColumnHead label="Date Range Picker" />,
  // Support
  community: <ColumnHead {...{ label: 'Community' }} />,
  'bugs/features': (
    <ColumnHead
      {...{
        label: 'Bug reports & feature requests',
        tooltip:
          'You can report an unlimited number of bugs and submit unlimited feature requests.',
      }}
    />
  ),
  'tech-advisory': (
    <ColumnHead
      {...{
        label: 'Technical advisory',
        metadata: 'Subject to fair use policy',
        tooltip: 'Get the advice you need, from the people who build the product.',
      }}
    />
  ),
  'support-duration': (
    <ColumnHead
      {...{ label: 'Support duration', tooltip: 'Included with initial license purchase.' }}
    />
  ),
  'response-time': (
    <ColumnHead
      {...{ label: 'Guaranteed response time', tooltip: 'Maximum lead time for each response.' }}
    />
  ),
  'pre-screening': (
    <ColumnHead
      {...{
        label: 'Pre-screening',
        tooltip:
          'Ensure we have enough details in the ticket you submitted so our support team can work on it.',
      }}
    />
  ),
  'issue-escalation': (
    <ColumnHead
      {...{
        label: 'Issue escalation',
        tooltip: 'Escalate your tickets to highest priority in our support queue.',
      }}
    />
  ),
};

const communityData: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': <IconImage name="yes" />,
  '@mui/unstyled': <IconImage name="yes" />,
  '@mui/system': <IconImage name="yes" />,
  // Advanced
  'data-grid/column-groups': <IconImage name="time" />,
  'data-grid/column-spanning': <IconImage name="time" />,
  'data-grid/column-resizing': <IconImage name="no" />,
  'data-grid/column-reorder': <IconImage name="no" />,
  'data-grid/column-pinning': <IconImage name="no" />,
  'data-grid/row-sorting': <IconImage name="yes" />,
  'data-grid/row-height': <IconImage name="yes" />,
  'data-grid/row-spanning': <IconImage name="time" />,
  'data-grid/row-reordering': <IconImage name="no" />,
  'data-grid/row-selection': <IconImage name="yes" />,
  'data-grid/row-multiselection': <IconImage name="no" />,
  'data-grid/row-rangeselection': <IconImage name="no" />,
  'data-grid/filter-quick': <IconImage name="time" />,
  'data-grid/filter-column': <IconImage name="yes" />,
  'data-grid/filter-multicolumn': <IconImage name="no" />,
  'data-grid/pagination': <IconImage name="yes" />,
  'data-grid/pagination-large': <IconImage name="no" />,
  'data-grid/edit-row': <IconImage name="yes" />,
  'data-grid/edit-cell': <IconImage name="yes" />,
  'data-grid/file-csv': <IconImage name="yes" />,
  'data-grid/file-print': <IconImage name="time" />,
  'data-grid/file-clipboard': <IconImage name="no" />,
  'data-grid/file-excel': <IconImage name="no" />,
  'data-grid/customizable-components': <IconImage name="yes" />,
  'data-grid/virtualize-column': <IconImage name="yes" />,
  'data-grid/virtualize-row': <IconImage name="no" />,
  'data-grid/tree-data': <IconImage name="no" />,
  'data-grid/master-detail': <IconImage name="no" />,
  'data-grid/grouping': <IconImage name="no" />,
  'data-grid/aggregation': <IconImage name="no" />,
  'data-grid/pivoting': <IconImage name="no" />,
  'data-grid/accessibility': <IconImage name="yes" />,
  'data-grid/keyboard-nav': <IconImage name="yes" />,
  'data-grid/localization': <IconImage name="yes" />,
  'data-grid-pro': <IconImage name="no" />,
  'date-range-picker': <IconImage name="no" />,
  // Support
  community: <IconImage name="yes" />,
  'bugs/features': <IconImage name="yes" />,
  'tech-advisory': <IconImage name="no" />,
  'support-duration': <IconImage name="no" />,
  'response-time': <IconImage name="no" />,
  'pre-screening': <IconImage name="no" />,
  'issue-escalation': <IconImage name="no" />,
};

const proData: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': <IconImage name="yes" />,
  '@mui/unstyled': <IconImage name="yes" />,
  '@mui/system': <IconImage name="yes" />,
  // Advanced
  'data-grid/column-groups': <IconImage name="time" />,
  'data-grid/column-spanning': <IconImage name="time" />,
  'data-grid/column-resizing': <IconImage name="yes" />,
  'data-grid/column-reorder': <IconImage name="yes" />,
  'data-grid/column-pinning': <IconImage name="time" />,
  'data-grid/row-sorting': <IconImage name="yes" />,
  'data-grid/row-height': <IconImage name="yes" />,
  'data-grid/row-spanning': <IconImage name="time" />,
  'data-grid/row-reordering': <IconImage name="time" />,
  'data-grid/row-selection': <IconImage name="yes" />,
  'data-grid/row-multiselection': <IconImage name="yes" />,
  'data-grid/row-rangeselection': <IconImage name="no" />,
  'data-grid/filter-quick': <IconImage name="time" />,
  'data-grid/filter-column': <IconImage name="yes" />,
  'data-grid/filter-multicolumn': <IconImage name="yes" />,
  'data-grid/pagination': <IconImage name="yes" />,
  'data-grid/pagination-large': <IconImage name="yes" />,
  'data-grid/edit-row': <IconImage name="yes" />,
  'data-grid/edit-cell': <IconImage name="yes" />,
  'data-grid/file-csv': <IconImage name="yes" />,
  'data-grid/file-print': <IconImage name="time" />,
  'data-grid/file-clipboard': <IconImage name="time" />,
  'data-grid/file-excel': <IconImage name="no" />,
  'data-grid/customizable-components': <IconImage name="yes" />,
  'data-grid/virtualize-column': <IconImage name="yes" />,
  'data-grid/virtualize-row': <IconImage name="yes" />,
  'data-grid/tree-data': <IconImage name="time" />,
  'data-grid/master-detail': <IconImage name="time" />,
  'data-grid/grouping': <IconImage name="no" />,
  'data-grid/aggregation': <IconImage name="no" />,
  'data-grid/pivoting': <IconImage name="no" />,
  'data-grid/accessibility': <IconImage name="yes" />,
  'data-grid/keyboard-nav': <IconImage name="yes" />,
  'data-grid/localization': <IconImage name="yes" />,
  'data-grid-pro': <Info value="1 year" />,
  'date-range-picker': <IconImage name="time" />,
  // Support
  community: <IconImage name="yes" />,
  'bugs/features': <Info value={<IconImage name="yes" />} metadata="Priority over Community" />,
  'tech-advisory': <IconImage name="no" />,
  'support-duration': <Info value="1 year" />,
  'response-time': <IconImage name="no" />,
  'pre-screening': <IconImage name="no" />,
  'issue-escalation': <IconImage name="no" />,
};

const premiumData: Record<string, React.ReactNode> = {
  // Core
  '@mui/core': <IconImage name="yes" />,
  '@mui/unstyled': <IconImage name="yes" />,
  '@mui/system': <IconImage name="yes" />,
  // Advanced
  'data-grid/column-groups': <IconImage name="time" />,
  'data-grid/column-spanning': <IconImage name="time" />,
  'data-grid/column-resizing': <IconImage name="yes" />,
  'data-grid/column-reorder': <IconImage name="yes" />,
  'data-grid/column-pinning': <IconImage name="time" />,
  'data-grid/row-sorting': <IconImage name="yes" />,
  'data-grid/row-height': <IconImage name="yes" />,
  'data-grid/row-spanning': <IconImage name="time" />,
  'data-grid/row-reordering': <IconImage name="time" />,
  'data-grid/row-selection': <IconImage name="yes" />,
  'data-grid/row-multiselection': <IconImage name="yes" />,
  'data-grid/row-rangeselection': <IconImage name="time" />,
  'data-grid/filter-quick': <IconImage name="time" />,
  'data-grid/filter-column': <IconImage name="yes" />,
  'data-grid/filter-multicolumn': <IconImage name="yes" />,
  'data-grid/pagination': <IconImage name="yes" />,
  'data-grid/pagination-large': <IconImage name="yes" />,
  'data-grid/edit-row': <IconImage name="yes" />,
  'data-grid/edit-cell': <IconImage name="yes" />,
  'data-grid/file-csv': <IconImage name="yes" />,
  'data-grid/file-print': <IconImage name="time" />,
  'data-grid/file-clipboard': <IconImage name="time" />,
  'data-grid/file-excel': <IconImage name="no" />,
  'data-grid/customizable-components': <IconImage name="yes" />,
  'data-grid/virtualize-column': <IconImage name="yes" />,
  'data-grid/virtualize-row': <IconImage name="yes" />,
  'data-grid/tree-data': <IconImage name="time" />,
  'data-grid/master-detail': <IconImage name="time" />,
  'data-grid/grouping': <IconImage name="time" />,
  'data-grid/aggregation': <IconImage name="time" />,
  'data-grid/pivoting': <IconImage name="time" />,
  'data-grid/accessibility': <IconImage name="yes" />,
  'data-grid/keyboard-nav': <IconImage name="yes" />,
  'data-grid/localization': <IconImage name="yes" />,
  'data-grid-pro': <Info value="1 year" />,
  'date-range-picker': <IconImage name="time" />,
  // Support
  community: <IconImage name="yes" />,
  'bugs/features': <Info value={<IconImage name="yes" />} metadata="Priority over Pro" />,
  'tech-advisory': <IconImage name="time" />,
  'support-duration': <Info value="1 year" />,
  'response-time': <Info value="2 business days" metadata="1 business day (priority only)" />,
  'pre-screening': <Info value="4 hours" metadata="priority only" />,
  'issue-escalation': <Info value={<IconImage name="time" />} metadata="priority only" />,
};

const RowCategory = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      typography: 'caption',
      display: 'block',
      fontWeight: 500,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
      py: 1,
      ml: 1,
      pl: 1.5,
      borderBottom: '1px solid',
      borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.200'),
      ...props.sx,
    }}
  />
);

const StickyHead = ({
  container,
  disableCalculation = false,
}: {
  container: React.MutableRefObject<HTMLElement | null>;
  disableCalculation?: boolean;
}) => {
  const [hidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    function handleScroll() {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        const appHeaderHeight = 64;
        const headHeight = 41;
        const tablePaddingTop = 40;
        if (
          rect.top + appHeaderHeight < 0 &&
          rect.height + rect.top - appHeaderHeight - headHeight - tablePaddingTop > 0
        ) {
          setHidden(false);
        } else {
          setHidden(true);
        }
      }
    }
    if (!disableCalculation) {
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }
    return () => {};
  }, [container, disableCalculation]);
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 1,
        top: 64,
        left: 0,
        right: 0,
        transition: '0.3s',
        ...(hidden && {
          opacity: 0,
          top: 0,
        }),
        py: 1,
        display: { xs: 'none', md: 'block' },
        backdropFilter: 'blur(20px)',
        boxShadow: (theme) =>
          `inset 0px -1px 1px ${
            theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100]
          }`,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[900], 0.72)
            : 'rgba(255,255,255,0.72)',
      }}
    >
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: `minmax(160px, 1fr) repeat(3, minmax(240px, 1fr))`,
        }}
      >
        <Typography variant="body2" fontWeight="bold" sx={{ px: 2, py: 1 }}>
          Plans
        </Typography>
        {(['community', 'pro', 'premium'] as const).map((plan) => (
          <Box key={plan} sx={{ px: 2, py: 1 }}>
            <PlanName plan={plan} centered disableDescription />
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default function PricingTable({
  columnHeaderHidden,
  plans = ['community', 'pro', 'premium'],
  ...props
}: BoxProps & {
  columnHeaderHidden?: boolean;
  plans?: Array<'community' | 'pro' | 'premium'>;
}) {
  const [dataGridCollapsed, setDataGridCollapsed] = React.useState(false);
  const tableRef = React.useRef<HTMLDivElement | null>(null);
  const gridSx = {
    display: 'grid',
    gridTemplateColumns: `minmax(160px, 1fr) repeat(${plans.length}, minmax(${
      columnHeaderHidden ? '0px' : '240px'
    }, 1fr))`,
  };
  function renderRow(key: string) {
    return (
      <Box
        sx={{
          ...gridSx,
          '&:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primaryDark[900], 0.3)
                : alpha(theme.palette.grey[50], 0.4),
            '@media (hover: none)': {
              bgcolor: 'initial',
            },
          },
        }}
      >
        {rowHeaders[key]}
        {plans.map((id, index) => (
          <Cell key={id} highlighted={index % 2 === 1}>
            {id === 'community' && communityData[key]}
            {id === 'pro' && proData[key]}
            {id === 'premium' && premiumData[key]}
          </Cell>
        ))}
      </Box>
    );
  }
  const divider = <Divider />;
  const nestedDivider = <Divider sx={{ ml: 1 }} />;
  return (
    <Box
      ref={tableRef}
      {...props}
      sx={{
        width: '100%',
        overflow: 'auto',
        py: { xs: 2, md: 4 },
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...props.sx,
      }}
    >
      <StickyHead container={tableRef} disableCalculation={columnHeaderHidden} />
      {!columnHeaderHidden && (
        <Box sx={gridSx}>
          <Typography variant="body2" fontWeight="bold" sx={{ p: 2 }}>
            Plans
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <div>
              <PlanName plan="community" />
            </div>
            <PlanPrice plan="community" />
            <Button
              component={Link}
              noLinkStyle
              href="/getting-started/usage/"
              variant="outlined"
              fullWidth
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ py: 1, mt: 'auto' }}
            >
              Get started
            </Button>
          </Box>
          <ColumnHeadHighlight>
            <Recommended />
            <div>
              <PlanName plan="pro" />
            </div>
            <PlanPrice plan="pro" />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Price capped at 10 developers.
            </Typography>
            <Button
              component={Link}
              noLinkStyle
              href="https://material-ui.com/store/items/material-ui-pro/"
              variant="contained"
              fullWidth
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ py: 1, mt: 'auto' }}
            >
              Buy now
            </Button>
          </ColumnHeadHighlight>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ opacity: 0.5 }}>
              <PlanName plan="premium" />
              <PlanPrice plan="premium" />
            </Box>
            <Button
              variant="outlined"
              disabled
              fullWidth
              sx={{ py: 1, mt: 'auto', '&.Mui-disabled': { color: 'text.secondary' } }}
            >
              Available later this year!
            </Button>
          </Box>
        </Box>
      )}
      <RowHead startIcon={<IconImage name="product-core" width="28" height="28" />}>
        MUI Core
      </RowHead>
      {renderRow('@mui/core')}
      {divider}
      {renderRow('@mui/unstyled')}
      {divider}
      {renderRow('@mui/system')}

      <RowHead startIcon={<IconImage name="product-advanced" width="28" height="28" />}>
        MUI X
      </RowHead>
      <Box sx={{ position: 'relative', minHeight: 58, '& svg': { transition: '0.3s' }, ...gridSx }}>
        <Cell />
        <Cell sx={{ minHeight: 60 }}>
          <UnfoldMoreRounded
            fontSize="small"
            sx={{ color: 'grey.600', opacity: dataGridCollapsed ? 0 : 1 }}
          />
        </Cell>
        <Cell highlighted sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
          <UnfoldMoreRounded
            fontSize="small"
            sx={{ color: 'grey.600', opacity: dataGridCollapsed ? 0 : 1 }}
          />
        </Cell>
        <Cell sx={{ display: { xs: 'none', md: 'flex' }, minHeight: 60 }}>
          <UnfoldMoreRounded
            fontSize="small"
            sx={{ color: 'grey.600', opacity: dataGridCollapsed ? 0 : 1 }}
          />
        </Cell>
        <Button
          fullWidth
          onClick={() => setDataGridCollapsed((bool) => !bool)}
          endIcon={
            <KeyboardArrowRightRounded
              color="primary"
              sx={{
                transform: dataGridCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)',
              }}
            />
          }
          sx={{
            p: 1,
            py: 1.5,
            justifyContent: 'flex-start',
            fontWeight: 400,
            borderRadius: '0px',
            color: 'text.primary',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primaryDark[900], 0.3)
                  : alpha(theme.palette.grey[50], 0.4),
              '@media (hover: none)': {
                bgcolor: 'initial',
              },
            },
          }}
        >
          Data Grid
        </Button>
      </Box>
      <Collapse in={dataGridCollapsed} timeout={700} sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '2px',
            left: 10,
            top: 0,
            bottom: 0,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
          }}
        />
        <RowCategory>Column features</RowCategory>
        {renderRow('data-grid/column-groups')}
        {nestedDivider}
        {renderRow('data-grid/column-spanning')}
        {nestedDivider}
        {renderRow('data-grid/column-resizing')}
        {nestedDivider}
        {renderRow('data-grid/column-reorder')}
        {nestedDivider}
        {renderRow('data-grid/column-pinning')}
        {nestedDivider}
        <RowCategory>Row features</RowCategory>
        {renderRow('data-grid/row-sorting')}
        {nestedDivider}
        {renderRow('data-grid/row-height')}
        {nestedDivider}
        {renderRow('data-grid/row-spanning')}
        {nestedDivider}
        {renderRow('data-grid/row-reordering')}
        {nestedDivider}
        <RowCategory>Selection features</RowCategory>
        {renderRow('data-grid/row-selection')}
        {nestedDivider}
        {renderRow('data-grid/row-multiselection')}
        {nestedDivider}
        {renderRow('data-grid/row-rangeselection')}
        {nestedDivider}
        <RowCategory>Filtering features</RowCategory>
        {renderRow('data-grid/filter-quick')}
        {nestedDivider}
        {renderRow('data-grid/filter-column')}
        {nestedDivider}
        {renderRow('data-grid/filter-multicolumn')}
        {nestedDivider}
        <RowCategory>Pagination features</RowCategory>
        {renderRow('data-grid/pagination')}
        {nestedDivider}
        {renderRow('data-grid/pagination-large')}
        {nestedDivider}
        <RowCategory>Editing features</RowCategory>
        {renderRow('data-grid/edit-row')}
        {nestedDivider}
        {renderRow('data-grid/edit-cell')}
        {nestedDivider}
        <RowCategory>Import & export</RowCategory>
        {renderRow('data-grid/file-csv')}
        {nestedDivider}
        {renderRow('data-grid/file-print')}
        {nestedDivider}
        {renderRow('data-grid/file-clipboard')}
        {nestedDivider}
        {renderRow('data-grid/file-excel')}
        {nestedDivider}
        <RowCategory>Rendering features</RowCategory>
        {renderRow('data-grid/customizable-components')}
        {nestedDivider}
        {renderRow('data-grid/virtualize-column')}
        {nestedDivider}
        {renderRow('data-grid/virtualize-row')}
        {nestedDivider}
        <RowCategory>Group & pivot</RowCategory>
        {renderRow('data-grid/tree-data')}
        {nestedDivider}
        {renderRow('data-grid/master-detail')}
        {nestedDivider}
        {renderRow('data-grid/grouping')}
        {nestedDivider}
        {renderRow('data-grid/aggregation')}
        {nestedDivider}
        {renderRow('data-grid/pivoting')}
        {nestedDivider}
        <RowCategory>Miscellaneous</RowCategory>
        {renderRow('data-grid/accessibility')}
        {nestedDivider}
        {renderRow('data-grid/keyboard-nav')}
        {nestedDivider}
        {renderRow('data-grid/localization')}
      </Collapse>
      {divider}
      {renderRow('data-grid-pro')}
      {divider}
      {renderRow('date-range-picker')}

      <RowHead>Support</RowHead>
      {renderRow('community')}
      {divider}
      {renderRow('bugs/features')}
      {divider}
      {renderRow('tech-advisory')}
      {divider}
      {renderRow('support-duration')}
      {divider}
      {renderRow('response-time')}
      {divider}
      {renderRow('pre-screening')}
      {divider}
      {renderRow('issue-escalation')}
      {divider}
    </Box>
  );
}
