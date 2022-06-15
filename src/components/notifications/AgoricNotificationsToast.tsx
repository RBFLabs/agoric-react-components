import React, {useMemo} from 'react';
import {IoAlertCircleSharp, IoCheckmarkCircleSharp, IoInformationCircleSharp} from 'react-icons/io5';
import styled from 'styled-components';
import theme from '../../theme';
import {AgoricNotificationsToastType} from './AgoricNotificationsToastType';

const StyledToast = styled.div`
  color: ${theme.colors.text2};
  display: flex;
  align-items: center;
`;

const StyledToastText = styled.div`
  width: 100%;
`;

const StyledToastIcon = styled.div`
  width: 40px;
  text-align: center;
  margin-right: 10px;
`;

interface AgoricNotificationsToastProps {
  iconSize?: number;
  text: string;
  type?: AgoricNotificationsToastType;
}

export function AgoricNotificationsToast({iconSize = 28, text, type}: AgoricNotificationsToastProps) {
  const icon = useMemo(() => {
    switch (type) {
      case AgoricNotificationsToastType.Success:
        return <IoCheckmarkCircleSharp color={theme.colors.green} size={iconSize} />;
      case AgoricNotificationsToastType.Error:
        return <IoAlertCircleSharp color={theme.colors.redMedium} size={iconSize} />;
      case AgoricNotificationsToastType.Info:
        return <IoInformationCircleSharp color={theme.colors.text1} size={iconSize} />;
      default:
        return null;
    }
  }, [iconSize, type]);

  return (
    <StyledToast>
      {icon && <StyledToastIcon>{icon}</StyledToastIcon>}
      <StyledToastText>{text}</StyledToastText>
    </StyledToast>
  );
}
