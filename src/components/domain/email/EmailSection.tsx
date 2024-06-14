"use client";

import { Skeleton } from '@/components/ui/Skeleton';
import { useEmails } from '@/composables/emails/query/useEmails';
import { EmailsPaginationRequestDTO } from '@/services/email/listEmails.get';
import React from 'react'
import MHDError from '../MHDError';

const EmailSection = () => {
  const paginationDTO = new EmailsPaginationRequestDTO("1", "10");
  const { data, status, refetch, error } = useEmails(paginationDTO);

  if (status === "pending") {
    return <Skeleton className="w-full h-96" />;
  }

  if (status === "error") {
    return <MHDError></MHDError>;
  }


  return (  
    <div className="flex gap-2">
      AI
    </div>
  )
}

export default EmailSection
