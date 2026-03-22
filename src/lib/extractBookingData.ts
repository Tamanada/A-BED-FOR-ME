export interface ExtractedHotelData {
  name: string;
  rating: number;
  location: string;
  imageUrl: string;
  reviewCount: number;
}

/**
 * Simulates extracting data from a Booking.com or Airbnb link.
 * In production, this would call a backend API that scrapes or uses an API.
 * For the alpha, we simulate the extraction with realistic mock data.
 */
export async function extractBookingData(url: string): Promise<ExtractedHotelData | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (url.includes('booking.com')) {
    // Extract a fake hotel name from the URL slug
    const slugMatch = url.match(/hotel\/[a-z]{2}\/([^/.?]+)/);
    const slug = slugMatch ? slugMatch[1].replace(/-/g, ' ') : 'Hotel Property';
    const name = slug
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      name,
      rating: parseFloat((7 + Math.random() * 2.5).toFixed(1)),
      location: 'Extracted from Booking.com',
      imageUrl: '',
      reviewCount: Math.floor(100 + Math.random() * 900),
    };
  }

  if (url.includes('airbnb.com')) {
    return {
      name: 'Airbnb Property',
      rating: parseFloat((4 + Math.random() * 0.9).toFixed(1)),
      location: 'Extracted from Airbnb',
      imageUrl: '',
      reviewCount: Math.floor(10 + Math.random() * 200),
    };
  }

  return null;
}
