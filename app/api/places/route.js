import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Google API key is missing' }, { status: 500 });
  }

  // Extract query parameters using URLSearchParams
  const { searchParams } = new URL(request.url);
  const businessName = searchParams.get('business_name');

  // List of provinces in Canada
  const provinces = [
    'Alberta',
    'British Columbia',
    'Manitoba',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova Scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon'
  ];

  // General business types to target
  const categories = ['restaurant', 'hotel', 'shop', 'gym', 'hospital'];

  let allResults = [];
  let finalResponse = { status: 'OK', totalResults: 0, results: [] }; // Initial structure

  try {
    for (const province of provinces) {
      for (const category of categories) {
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
          businessName ? businessName : category
        }+in+Canada&key=${apiKey}`;

        let nextPageToken = null;

        // Paginate through the results for each province-category/businessName combination
        do {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results) {
            allResults = [...allResults, ...data.results];
          }

          // Capture the status to return in the final response
          if (!finalResponse.status || finalResponse.status === 'OK') {
            finalResponse.status = data.status;
          }

          nextPageToken = data.next_page_token;

          // Check if there's a next page and handle rate limit with delay
          if (nextPageToken) {
            // Wait 2 seconds before requesting the next page to avoid API rate limits
            await new Promise((resolve) => setTimeout(resolve, 2000));
            url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nextPageToken}&key=${apiKey}`;
          }
        } while (nextPageToken);
      }
    }

    // Remove duplicates by `place_id`
    const uniqueResults = allResults.filter(
      (business, index, self) =>
        index === self.findIndex((b) => b.place_id === business.place_id)
    );

    // Structure the final response
    finalResponse.totalResults = uniqueResults.length;
    finalResponse.results = uniqueResults;

    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error('Error fetching Google Places data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}