import { NextResponse, NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const body = await request.formData();
  const categoryName = body.get('categoryName');
  return NextResponse.json(categoryName);
};
