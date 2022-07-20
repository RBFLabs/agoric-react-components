export function getUpdatedOffer(previousOffers: any[] | undefined, updatedOffers: any[] | undefined) {
  /**
   * This function compared old and new offers arrays and returns updated offer
   * The change can be:
   * 1. either new offer was added
   * 2. status of some existing offer was changed
   */

  if (previousOffers === undefined || updatedOffers === undefined) {
    return null;
  }

  const previousLength = previousOffers.length;
  const updatedLength = updatedOffers.length;

  // This probably should not happen. If it does throw error and investigate why
  if (updatedLength < previousLength) {
    throw Error('afterLength < beforeLength');
  } else if (updatedLength > previousLength) {
    // New offer was added
    if (updatedLength - previousLength > 1) {
      // Updated offers should have the same size as previous offers or be by just 1 element larger
      // However, updated offers can by larger by more than 1 element on page reload, because all previous offers will get deleted
      // We don't show any notifications in that scenario
      console.warn('1. updatedLength - previousLength > 1'); // eslint-disable-line no-console
      console.warn('2. previousOffers: ', previousOffers); // eslint-disable-line no-console
      console.warn('3. updatedOffers: ', updatedOffers); // eslint-disable-line no-console
      return null;
    }
    // return the last offer (that one was added)
    return updatedOffers[updatedOffers.length - 1];
  } else if (updatedLength === previousLength) {
    // Find the offer whose status has changed
    for (let i = 0; i < updatedLength; i++) {
      if (previousOffers[i].status !== updatedOffers[i].status) return updatedOffers[i];
    }
  }

  return null;
}
