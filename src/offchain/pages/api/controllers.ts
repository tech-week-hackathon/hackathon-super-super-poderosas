import prisma from "@/prisma/prisma";
import { User, MiniGov, Action, Vote } from "@prisma/client";

export const getOrCreateUser = async (address: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { address: address },
  });
  if (!user) {
    const result = await prisma.user.create({
      data: {
        address: address,
      },
    });
    return result;
  } else {
    return user;
  }
};

export const getOrCreateMiniGov = async (
  name: string,
  admin: User,
  expirationDate: number,
): Promise<MiniGov> => {
  const miniGov = await prisma.miniGov.findFirst({
    where: { name: name },
  });
  if (!miniGov) {
    const result = await prisma.miniGov.create({
      data: {
        name: name,
        members: {
          connect: { userId: admin.userId },
        },
        expirationDate: expirationDate,
      },
    });
    return result;
  } else {
    return miniGov;
  }
};

export const getAndCreateAction = async (
  name: string,
  txHash: string,
): Promise<Action> => {
  const action = await prisma.action.findFirst({
    where: { txHash: txHash },
  });
  if (!action) {
    const result = await prisma.action.create({
      data: {
        type_name: name,
        txHash: txHash,
        startTime: new Date(),
        votes: {},
      },
    });
    return result;
  } else {
    return action;
  }
};

export const getOrCreateVote = async (
  type: string,
  votingPower: number,
  voteUserId: string,
  voteActionId: string,
): Promise<Vote> => {
  const vote = await prisma.vote.findFirst({
    where: { voteUserId: voteUserId, voteActionId: voteActionId },
  });
  if (!vote) {
    const result = await prisma.vote.create({
      data: {
        type: type,
        votingPower: votingPower,
        voteUserId: voteUserId,
        voteActionId: voteActionId,
      },
    });
    return result;
  } else {
    return vote;
  }
};
