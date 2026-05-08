const prisma = require("../../config/database");

class AnalysisModel {
  static async createAnalysis(data) {
    return await prisma.analysis.create({
      data,
    });
  }

  static async getAnalysisById(id) {
    return await prisma.analysis.findUnique({
      where: { id },
    });
  }

  static async getAnalysesByUserId(userId) {
    return await prisma.analysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async deleteAnalysis(id) {
    return await prisma.analysis.delete({
      where: { id },
    });
  }
}

module.exports = AnalysisModel;
