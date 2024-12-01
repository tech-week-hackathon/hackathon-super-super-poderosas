import prisma from "@/prisma/prisma";
import { miniGovsInfo } from "@/utils/types";
import { Action, MiniGov, User, Vote } from "@prisma/client";

export const getOrCreateUser = async (
  address: string,
): Promise<{
  user: User;
  message: string;
  name?: string;
}> => {
  const user = await prisma.user.findUnique({
    where: { address: address },
  });
  if (!user) {
    const result = await prisma.user.create({
      data: {
        address: address,
      },
    });
    return Promise.resolve({ user: result, message: "Create User Ok" });
  } else {
    return Promise.resolve({
      user: user,
      message: "Already exists",
      name: user.userMiniGovId ?? undefined,
    });
  }
};

export const getOrCreateMiniGov = async (
  name: string,
  admin: User,
  token: string,
  expirationDate: number,
): Promise<MiniGov> => {
  const miniGov = await prisma.miniGov.findFirst({
    where: { name: name },
  });
  if (!miniGov) {
    const result = await prisma.miniGov.create({
      data: {
        name: name,
        token: token,
        members: {
          connect: { address: admin.address }, // REVIEW
        },
        expirationDate: expirationDate,
      },
    });
    await prisma.user.update({
      where: { address: admin.address },
      data: { userMiniGovId: result.name },
    });
    return result;
  } else {
    // // Ensure the admin is part of the MiniGov members
    // await prisma.miniGov.update({
    //   where: { name: miniGov.name },
    //   data: {
    //     members: {
    //       connect: { address: admin.address }, // Ensure membership
    //     },
    //   },
    // });

    return miniGov;
  }
};

export const joinMiniGov = async (
  address: string,
  miniGovName: string,
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { address: address },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const miniGov = await prisma.miniGov.findUnique({
    where: { name: miniGovName },
  });
  if (!miniGov) {
    throw new Error("MiniGov not found");
  }

  await prisma.user.update({
    where: { address: address },
    data: {
      userMiniGovId: miniGovName,
    },
  });

  await prisma.miniGov.update({
    where: { name: miniGovName },
    data: {
      members: {
        connect: { address: address },
      },
    },
  });
};

export const getAllMiniGovs = async (): Promise<miniGovsInfo[]> => {
  const miniGovs = await prisma.miniGov.findMany({
    select: {
      name: true,
      _count: {
        select: { members: true },
      },
      token: true,
    },
  });

  return miniGovs.map((miniGov) => ({
    name: miniGov.name,
    token: miniGov.token,
    users_amount: miniGov._count.members,
  }));
};

export const getAndCreateAction = async (
  hash: string,
  index: number,
  type: string,
): Promise<Action> => {
  const action = await prisma.action.findUnique({
    where: { txHash: hash },
  });
  if (!action) {
    const result = await prisma.action.create({
      data: {
        type_name: type,
        title: "",
        txHash: hash,
        index: index,
        startTime: new Date(),
        votes: {},
      },
    });
    return result;
  } else {
    return action;
  }
};

export const getActions = async (): Promise<Action[]> => {
  const actions = await prisma.action.findMany();
  // TODO - filter actions by MiniGov
  return actions;
};

export const getOrCreateVote = async (
  type: string,
  votingPower: number,
  voteUserId: string,
  voteActionId: string,
): Promise<Vote | { message: string }> => {
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
    return { message: "Ignore" };
  }
};

export const getAllVotes = async (
  txHash: string,
  miniGovName: string,
): Promise<Vote[]> => {
  const action = await prisma.action.findUnique({
    where: { txHash },
  });

  if (!action) {
    throw new Error("Action not found");
  }

  const votes = await prisma.vote.findMany({
    where: {
      action: {
        txHash,
      },
      user: {
        miniGov: {
          name: miniGovName,
        },
      },
    },
    include: {
      user: true,
      action: true,
    },
  });

  return votes;
};
