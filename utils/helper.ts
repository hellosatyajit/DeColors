export const getDiscountedPricePercentage = (
    originalPrice: number,
    discountedPrice: number
) => {
    const discount = originalPrice - discountedPrice;

    const discountPercentage = (discount / originalPrice) * 100;

    return discountPercentage.toFixed(2);
};