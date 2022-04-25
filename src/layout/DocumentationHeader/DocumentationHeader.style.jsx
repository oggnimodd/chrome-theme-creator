import tw, { styled } from 'twin.macro';
import { Wrapper } from '../../common/Wrapper';
import Link from '../../common/RouterLink';

export const Header = styled.header`
  ${tw`
    text-[#d6eeee] 
    h-16 
    fixed 
    top-0 
    left-0   
    right-0
    bg-primary
    z-[99990]
  `}
`;

export const HeaderWrapper = styled(Wrapper)`
  ${tw`
    h-full 
    items-center
    flex 
    justify-between
  `}
`;

export const Brand = styled.div`
  ${tw`
    text-accent 
    text-2xl 
    font-semibold 
    pointer-events-none
  `}
`;

export const PreviousButton = styled(Link)`
  ${tw`
    text-primary
    bg-accent
    rounded-lg
    py-2 
    px-3 
    hover:bg-accent-lighter 
    flex 
    items-center 
    gap-x-1
    font-semibold
  `}
`;

export const ArrowWrapper = styled.span`
  ${tw`
    text-lg
  `}
`;