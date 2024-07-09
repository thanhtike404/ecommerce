import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const GET = async (request: NextRequest) => {
  try {
    const users = await prisma.user.findMany({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.formData();
    console.log(body);
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(error);
  }
};
