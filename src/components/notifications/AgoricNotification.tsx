import React, {useMemo} from 'react';
import {IoAlertCircleSharp, IoCheckmarkCircleSharp, IoInformationCircleSharp} from 'react-icons/io5';
import styled from 'styled-components';
import theme from '../../theme';
import {AgoricNotificationType} from './AgoricNotificationType';

const StyledNotification = styled.div`
  color: ${theme.colors.text2};
  display: flex;
  align-items: center;
`;

const StyledNotificationText = styled.div`
  width: 100%;
`;

const StyledNotificationIcon = styled.div`
  width: 40px;
  text-align: center;
  margin-right: 10px;
`;

interface AgoricNotificationProps {
  iconSize?: number;
  text: string;
  type?: AgoricNotificationType;
}

export function AgoricNotification({iconSize = 28, text, type}: AgoricNotificationProps) {
  const icon = useMemo(() => {
    switch (type) {
      case AgoricNotificationType.Success:
        return <IoCheckmarkCircleSharp color={theme.colors.green} size={iconSize} />;
      case AgoricNotificationType.Error:
        return <IoAlertCircleSharp color={theme.colors.redMedium} size={iconSize} />;
      case AgoricNotificationType.Info:
        return <IoInformationCircleSharp color={theme.colors.text1} size={iconSize} />;
      default:
        return null;
    }
  }, [iconSize, type]);

  return (
    <StyledNotification>
      {icon && <StyledNotificationIcon>{icon}</StyledNotificationIcon>}
      <StyledNotificationText>{text}</StyledNotificationText>
    </StyledNotification>
  );
}
