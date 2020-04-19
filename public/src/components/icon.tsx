import { h } from 'preact';
import styled from 'styled-components';
// @ts-ignore
import FeatherIcon from 'feather-icons-react';

interface IIconProps {
  icon: string;
  size?: string;
  className?: string;
}

const SizeableIcon = styled(FeatherIcon)`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const Icon = ({ icon, size = '24px', className }: IIconProps) => (
  <SizeableIcon icon={icon} className={className} size={size} />
);

export default Icon;
