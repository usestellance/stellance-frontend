'use client'
import { useParams } from 'next/navigation';
import React from 'react'
import { useGetInvoiceForClient } from '../../../../features/invoice/hooks';

export default function Page() {
     const { id } = useParams();
     const { data, isLoading, isError, error } = useGetInvoiceForClient({
       invoice_url: id?.toString() || "",
     });
  return (
    <div>Page</div>
  )
}
