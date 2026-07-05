export const oneOrder = {
  orders: [
    {
      id: 'order-1',
      ownerType: 'user',
      ownerId: 'user-1',
      userId: 'user-1',
      guestSessionId: null,
      items: [
        {
          id: 'cat-2',
          name: 'Пепперони',
          basePrice: 4200,
          price: 4200,
          options: {
            furType: 'Средняя',
            activityLevel: 'Игровой',
            extras: [],
          },
          quantity: 1,
        },
      ],
      totalPrice: 4200,
      customer: {
        city: 'Москва',
        street: 'Центральная',
        house: '1',
        apartment: '1',
        comment: 'Комментарий',
        payment: 'card',
      },
      createdAt: '2026-07-02T17:55:17.704Z',
    },
  ],
};

export const emptyOrders = {
  orders: [],
};
