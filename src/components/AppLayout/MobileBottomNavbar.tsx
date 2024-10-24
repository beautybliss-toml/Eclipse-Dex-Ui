import { Box, ColorMode, Menu, MenuButton, SimpleGrid, Text, VStack, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import LiquidityPageThumbnailIcon from '@/icons/pageNavigation/LiquidityPageThumbnailIcon'
import MorePageThumbnailIcon from '@/icons/pageNavigation/MoreThumbnailIcon'
import PortfolioPageThumbnailIcon from '@/icons/pageNavigation/PortfolioPageThumbnailIcon'
import SwapPageThumbnailIcon from '@/icons/pageNavigation/SwapPageThumbnailIcon'
import { colors } from '@/theme/cssVariables'
import { NavMoreButtonMenuPanel } from './components/NavMoreButtonMenuPanel'
import { shrinkToValue } from '@/utils/shrinkToValue'
import { useTranslation } from 'react-i18next'
import BridgePageThumbnailIcon from '@/icons/pageNavigation/BridgePageThumbnailIcon'

/** only used is Mobile */
export function MobileBottomNavbar() {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'
  const { pathname } = useRouter()
  const swapHref = '/swap'
  const isSwapActive = pathname === swapHref
  const liquidityHref = '/liquidity-pools'
  const isLiquidityActive = pathname === liquidityHref
  const protfolioHref = '/portfolio'
  const isPortfolioActive = pathname === protfolioHref
  const isMoreActive = pathname === '/staking'

  return (
    <SimpleGrid
      gridAutoFlow={'column'}
      gridAutoColumns={'1fr'}
      placeItems={'center'}
      height={'54px'}
      py={2}
      bg={colors.backgroundLight}
      borderTop={isLight ? `1px solid rgba(171, 196, 255, 0.2)` : `1px solid transparent`}
    >
      <BottomNavbarItem
        href={swapHref}
        text={t('swap.title')}
        icon={(colorMode) => <SwapPageThumbnailIcon colorMode={colorMode} isActive={isSwapActive} />}
        isActive={isSwapActive}
      />
      <BottomNavbarItem
        href={liquidityHref}
        text={t('liquidity.title')}
        icon={(colorMode) => <LiquidityPageThumbnailIcon colorMode={colorMode} isActive={isLiquidityActive} />}
        isActive={isLiquidityActive}
      />
      <BottomNavbarItem
        href={protfolioHref}
        text={t('portfolio.title')}
        icon={(colorMode) => <PortfolioPageThumbnailIcon colorMode={colorMode} isActive={isPortfolioActive} />}
        isActive={isPortfolioActive}
      />
      <div className='chakra-text css-1gw115p c-m-bridge'>
        <BridgePageThumbnailIcon width={"20px"} height={"20px"} />
        <a href="https://bridge.eclipse.xyz/" target="_blank" rel="noreferrer">Bridge</a>
      </div>
      <div className='chakra-text css-1gw115p c-m-bridge'>
        <BridgePageThumbnailIcon width={"20px"} height={"20px"} />
        <a href="https://x.com/turboswap_svm" target="_blank" rel="noreferrer">Twitter</a>
      </div>
      <div className='chakra-text css-1gw115p c-m-bridge'>
        <BridgePageThumbnailIcon width={"20px"} height={"20px"} />
        <a href="https://t.me/TurboSwap_SVM" target="_blank" rel="noreferrer">Telegram</a>
      </div>
    </SimpleGrid>
  )
}

function BottomNavbarItem({
  text,
  href,
  isActive,
  icon
}: {
  text: string
  href?: string
  isActive?: boolean
  icon?: ReactNode | ((colorMode: ColorMode) => ReactNode)
}) {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const content = (
    <VStack spacing={0}>
      <Box>{shrinkToValue(icon, [colorMode])}</Box>
      <Text
        color={isActive ? (isDark ? colors.textPrimary : colors.secondary) : colors.textSecondary}
        fontSize="xs"
        fontWeight={isActive ? 500 : 400}
      >
        {text}
      </Text>
    </VStack>
  )
  return href ? (
    <Link href={href}>
      <Box>{content}</Box>
    </Link>
  ) : (
    content
  )
}
