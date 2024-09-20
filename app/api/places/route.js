import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const country = 'Canada'; // Set the country to Canada
  const type = 'business'; // You can change this to 'restaurant', 'store', etc., for specific types

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=business+in+${encodeURIComponent(
    country
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data); // Sending JSON response
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
