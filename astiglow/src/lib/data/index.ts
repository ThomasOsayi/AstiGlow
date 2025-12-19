// ===========================================
// Central export for all data
// ===========================================

// Services
export {
    services,
    serviceCategories,
    getServicesByCategory,
    getPopularServices,
    getServiceById,
    formatPrice,
    formatDuration,
  } from './services';
  
  // Packages
  export {
    packages,
    getPackageById,
    getPopularPackages,
    calculatePackageTotal,
    calculateRegularTotal,
  } from './packages';
  
  // Reviews
  export {
    reviews,
    getFeaturedReviews,
    getAverageRating,
    getTotalReviewCount,
  } from './reviews';
  
  // Business Info
  export {
    businessInfo,
    businessHours,
    shortHours,
    stats,
    navLinks,
    servicePreviewCategories,
    cancellationPolicy,
    paymentOptions,
  } from './business';