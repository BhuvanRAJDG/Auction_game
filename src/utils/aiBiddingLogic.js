// AI Bidding Logic for Football Legends Auction Game

export function calculateAiBid({ player, currentBid, currentBidderId, aiManager, aiSquad, totalBudget = 100 }) {
  // Don't outbid yourself!
  if (currentBidderId === aiManager.id) {
    return { shouldBid: false, bidAmount: 0, reason: 'Already highest bidder' };
  }

  const remainingBudget = aiManager.budget;
  const squadCount = aiSquad.length;
  const slotsLeft = 11 - squadCount;

  if (slotsLeft <= 0) {
    return { shouldBid: false, bidAmount: 0, reason: 'Squad full' };
  }

  // Minimum reserve required to fill remaining squad positions (£2M per remaining player)
  const minReserve = Math.max(0, (slotsLeft - 1) * 2.0);
  const maxAffordableBid = remainingBudget - minReserve;

  if (maxAffordableBid <= currentBid) {
    return { shouldBid: false, bidAmount: 0, reason: 'Exceeds affordable budget' };
  }

  // Base valuation calculation based on OVR rating
  const ratingDelta = player.rating - 80;
  let baseValue = Math.max(5, ratingDelta * 1.6); // 95 OVR = ~29M, 99 OVR = ~35M

  // GOAT Tier multiplier
  if (player.rating >= 96) baseValue *= 1.45;
  else if (player.rating >= 93) baseValue *= 1.25;

  // Positional need multiplier
  const positionCount = aiSquad.filter(p => p.pos === player.pos).length;
  let positionMultiplier = 1.0;

  // Position needs logic
  if (player.pos === 'GK') {
    const hasGk = aiSquad.some(p => p.pos === 'GK');
    positionMultiplier = hasGk ? 0.2 : 1.3;
  } else if (['CB', 'LB', 'RB'].includes(player.pos)) {
    const defCount = aiSquad.filter(p => ['CB', 'LB', 'RB'].includes(p.pos)).length;
    if (defCount < 4) positionMultiplier = 1.25;
    else if (defCount >= 5) positionMultiplier = 0.4;
  } else if (['CM', 'CAM', 'CDM'].includes(player.pos)) {
    const midCount = aiSquad.filter(p => ['CM', 'CAM', 'CDM'].includes(p.pos)).length;
    if (midCount < 3) positionMultiplier = 1.25;
    else if (midCount >= 4) positionMultiplier = 0.4;
  } else if (['ST', 'CF', 'LW', 'RW'].includes(player.pos)) {
    const fwdCount = aiSquad.filter(p => ['ST', 'CF', 'LW', 'RW'].includes(p.pos)).length;
    if (fwdCount < 3) positionMultiplier = 1.3;
    else if (fwdCount >= 4) positionMultiplier = 0.3;
  }

  let finalValuation = baseValue * positionMultiplier;

  // Manager personality modifier
  if (aiManager.id === 'ai_carlo' && player.rating >= 93) {
    finalValuation *= 1.3; // Galáctico hunter
  } else if (aiManager.id === 'ai_pep' && ['CM', 'CAM', 'CDM', 'LW', 'RW'].includes(player.pos)) {
    finalValuation *= 1.25; // Midfield maestro
  } else if (aiManager.id === 'ai_alex' && ['ST', 'CF', 'LW', 'RW'].includes(player.pos)) {
    finalValuation *= 1.25; // Striker hunter
  } else if (aiManager.id === 'ai_jose' && ['CB', 'LB', 'RB', 'GK', 'CDM'].includes(player.pos)) {
    finalValuation *= 1.3; // Defensive wall
  } else if (aiManager.id === 'ai_klopp' && player.pac >= 88) {
    finalValuation *= 1.2; // Pace priority
  }

  // Cap valuation to maxAffordableBid
  finalValuation = Math.min(finalValuation, maxAffordableBid);

  // Determine increment amount
  let nextBid = currentBid + 1;
  if (currentBid === 0) {
    nextBid = Math.min(Math.round(player.rating * 0.15), finalValuation);
    if (nextBid < 1) nextBid = 1;
  } else if (finalValuation - currentBid > 15) {
    nextBid = currentBid + 5;
  } else if (finalValuation - currentBid > 8) {
    nextBid = currentBid + 2;
  }

  if (nextBid <= finalValuation && nextBid > currentBid && nextBid <= maxAffordableBid) {
    return { shouldBid: true, bidAmount: Math.round(nextBid), reason: 'Within valuation' };
  }

  return { shouldBid: false, bidAmount: 0, reason: 'Bid exceeds valuation ceiling' };
}
