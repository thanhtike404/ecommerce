import React from 'react';
import Link from 'next/link';
function page() {
  return (
    <div>
      <Link href={'/dashboard/setting/homeBanner'}>Home Page Banner</Link>
    </div>
  );
}

export default page;
