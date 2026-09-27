"use server";

export const getProposal = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/proposals/get`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error(`Error fetching proposal: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching proposal:", error);
    throw error;
  }
};

export const getProposalById = async (id) => {
  try {
    console.log("Fetching proposal with ID:", id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/proposals/single/${id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching proposal by ID:", error);
    throw error;
  }
};
