import React from 'react';
import {IoCloseOutline} from 'react-icons/io5';
import theme from '../../theme';
import {CloseButtonProps} from 'react-toastify/dist/components';

export function AgoricNotificationsCloseButton({closeToast}: CloseButtonProps) {
  return (
    <div onClick={closeToast} className="flex items-center">
      <IoCloseOutline size={20} color={theme.colors.text3} />
    </div>
  );
}
