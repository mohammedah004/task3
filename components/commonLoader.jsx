// components/CommonLoader.js
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


export default function CommonLoader() {
      const pathname = usePathname();

      useEffect(() => {
      // بمجرد أن يتغير الرابط (المسار) أو المعايير (Query Params)
      // هذا يعني أن الصفحة الجديدة بدأت تظهر، فنوقف التحميل
      NProgress.done();
      }, [pathname]);

      return null; // هذا المكون لا يرسم شيئاً على الشاشة، هو فقط منطق (Logic)
}